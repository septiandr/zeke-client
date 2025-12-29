/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { createPayment, getPaymentList, type PaymentPayload } from "@/api/api";
import { usePurchaseStore } from "@/stores/productStore";

type PaymentData = {
  title: string;
  bank_accounts: {
    bank: string;
    account_name: string;
    account_number: string;
  }[];
  ewallets: {
    provider: string;
    account_name: string;
    number: string;
  }[];
  note?: string;
};

type SelectedMethod =
  | {
      type: "bank";
      label: string;
      account_name: string;
      account_number: string;
    }
  | {
      type: "ewallet";
      label: string;
      account_name: string;
      number: string;
    };

type InvoiceData = {
  invoice_id?: string;
  amount?: number;
  payment_method?: "bank_transfer" | "ewallet";
  payment_channel?: string;
  expires_at?: string;
};

export default function PurchaseFormClient({
  brand,
  category,
}: {
  brand: string;
  category: string;
}) {
  const product = usePurchaseStore((s) => s.product);

  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [wa, setWa] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // modal + payment list state
  const [openPayment, setOpenPayment] = useState(false);
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // step + selection
  const [step, setStep] = useState<"select" | "summary">("select");
  const [selectedMethod, setSelectedMethod] = useState<SelectedMethod | null>(
    null
  );

  // invoice state
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [invoiceError, setInvoiceError] = useState<string | null>(null);

  const isML = useMemo(
    () => ["MOBILE LEGENDS", "Magic Chess"].includes(brand),
    [brand]
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!product) newErrors.product = "Pilih produk dulu";
    if (!userId.trim()) newErrors.userId = "User ID wajib diisi";
    if (isML && !zoneId.trim()) newErrors.zoneId = "Zone ID wajib diisi";

    if (!wa.trim()) {
      newErrors.wa = "Nomor WhatsApp wajib diisi";
    } else if (!/^08\d{8,12}$/.test(wa.trim())) {
      newErrors.wa = "Format nomor WhatsApp tidak valid (contoh: 08xxxxxxxxxx)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetModalState = () => {
    setPaymentError(null);
    setInvoiceError(null);
    setSelectedMethod(null);
    setInvoice(null);
    setStep("select");
  };

  const fetchPaymentMethods = async () => {
    setPaymentLoading(true);
    setPaymentError(null);

    try {
      const res: any = await getPaymentList();

      const data: PaymentData | null = res?.data?.bank_accounts
        ? (res.data as PaymentData)
        : res?.bank_accounts
        ? (res as PaymentData)
        : null;

      if (!data) throw new Error("Format response payment tidak sesuai");

      setPayment(data);
      setOpenPayment(true);
      resetModalState();
    } catch (e: any) {
      setPaymentError(e?.message || "Terjadi kesalahan");
      setOpenPayment(true);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await fetchPaymentMethods();
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const closeModal = () => {
    setOpenPayment(false);
    setPayment(null);
    resetModalState();
  };

  const ensureBeforeInvoice = () => {
    if (!product) {
      setInvoiceError("Produk belum dipilih");
      return false;
    }
    if (!wa.trim()) {
      setInvoiceError("Nomor WhatsApp wajib diisi");
      return false;
    }
    if (!product.price || product.price <= 0) {
      setInvoiceError("Harga produk tidak valid");
      return false;
    }
    return true;
  };

  const createInvoiceFlow = async (
    method: SelectedMethod,
    payload: PaymentPayload
  ) => {
    if (!ensureBeforeInvoice()) return;

    setSelectedMethod(method);
    setInvoiceLoading(true);
    setInvoiceError(null);

    try {
      const res: any = await createPayment(payload);

      // support 2 bentuk: {success, data} atau langsung data
      const inv: InvoiceData | null = res?.data
        ? (res.data as InvoiceData)
        : res
        ? (res as InvoiceData)
        : null;

      setInvoice(inv);
      setStep("summary");
    } catch (e: any) {
      setInvoiceError(e?.message || "Gagal membuat invoice");
      setStep("select");
    } finally {
      setInvoiceLoading(false);
    }
  };

  const chooseBank = (b: PaymentData["bank_accounts"][number]) => {
    if (!product) return setInvoiceError("Produk belum dipilih");

    const payload: PaymentPayload = {
      amount: product.price,
      payment_channel: b.bank,
      payment_method: "bank_transfer", // ✅ FIX
      phone_number: wa.trim(),
    };

    const method: SelectedMethod = {
      type: "bank",
      label: b.bank,
      account_name: b.account_name,
      account_number: b.account_number,
    };

    void createInvoiceFlow(method, payload);
  };

  const chooseEwallet = (w: PaymentData["ewallets"][number]) => {
    if (!product) return setInvoiceError("Produk belum dipilih");

    const payload: PaymentPayload = {
      amount: product.price,
      payment_channel: w.provider,
      payment_method: "e_wallet",
      phone_number: wa.trim(),
    };

    const method: SelectedMethod = {
      type: "ewallet",
      label: w.provider,
      account_name: w.account_name,
      number: w.number,
    };

    void createInvoiceFlow(method, payload);
  };

  const handleAlreadyPaid = async () => {
    const payload = {
      brand,
      category,
      product,
      userId: userId.trim(),
      zoneId: isML ? zoneId.trim() : undefined,
      wa: wa.trim(),
      paymentMethod: selectedMethod,
      invoice,
    };

    console.log("CONFIRM PAID:", payload);

    // TODO: hit API confirm payment
    // await confirmPaid(payload)

    closeModal();
  };

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <div className="text-sm text-zinc-400">{category}</div>
        <div className="text-lg font-extrabold">{brand}</div>

        {/* selected product hint */}
        <div className="mt-2 text-xs text-zinc-400">
          Produk:{" "}
          <span className="text-white">
            {product
              ? `${product.name} • Rp ${product.price.toLocaleString("id-ID")}`
              : "- belum dipilih -"}
          </span>
        </div>
        {errors.product && (
          <p className="mt-1 text-xs text-red-400">{errors.product}</p>
        )}

        <div className="mt-4 space-y-3">
          {/* USER ID */}
          <div>
            <label className="text-xs text-zinc-400">User ID *</label>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className={`mt-1 w-full rounded-xl border bg-black/30 px-3 py-2 text-sm outline-none ${
                errors.userId
                  ? "border-red-500"
                  : "border-white/10 focus:border-white/20"
              }`}
              placeholder="Contoh: 667632423"
            />
            {errors.userId && (
              <p className="mt-1 text-xs text-red-400">{errors.userId}</p>
            )}
          </div>

          {/* ZONE ID */}
          {isML && (
            <div>
              <label className="text-xs text-zinc-400">Zone ID *</label>
              <input
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                className={`mt-1 w-full rounded-xl border bg-black/30 px-3 py-2 text-sm outline-none ${
                  errors.zoneId
                    ? "border-red-500"
                    : "border-white/10 focus:border-white/20"
                }`}
                placeholder="Contoh: 5246"
              />
              {errors.zoneId && (
                <p className="mt-1 text-xs text-red-400">{errors.zoneId}</p>
              )}
            </div>
          )}

          {/* WHATSAPP */}
          <div>
            <label className="text-xs text-zinc-400">No WhatsApp *</label>
            <input
              value={wa}
              onChange={(e) => setWa(e.target.value)}
              className={`mt-1 w-full rounded-xl border bg-black/30 px-3 py-2 text-sm outline-none ${
                errors.wa
                  ? "border-red-500"
                  : "border-white/10 focus:border-white/20"
              }`}
              placeholder="08xxxxxxxxxx"
            />
            {errors.wa && (
              <p className="mt-1 text-xs text-red-400">{errors.wa}</p>
            )}
            <p className="mt-2 text-xs text-zinc-500">
              Nomor ini digunakan jika transaksi gagal/kendala & untuk
              pembayaran e-wallet.
            </p>
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={paymentLoading}
            className={`w-full rounded-xl py-3 font-bold text-white ${
              paymentLoading
                ? "bg-emerald-500/40 cursor-not-allowed"
                : "bg-emerald-500/80 hover:bg-emerald-500"
            }`}
          >
            {paymentLoading ? "Memuat pembayaran..." : "Beli"}
          </button>
        </div>
      </div>

      {/* MODAL PAYMENT */}
      {openPayment && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/70" onClick={closeModal} />

          <div className="relative z-10 w-full max-w-lg rounded-t-2xl sm:rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-extrabold">
                  {payment?.title ?? "Metode Pembayaran"}
                </div>
                <div className="text-xs text-zinc-400">
                  {step === "select"
                    ? "Pilih metode pembayaran dulu."
                    : "Cek rangkuman lalu lakukan pembayaran."}
                </div>
              </div>

              <button
                className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
                onClick={closeModal}
              >
                Tutup
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {paymentError && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                  {paymentError}
                </div>
              )}

              {invoiceError && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                  {invoiceError}
                </div>
              )}

              {/* STEP 1: SELECT */}
              {!paymentLoading && payment && step === "select" && (
                <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-6">
                  {invoiceLoading && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-200">
                      Membuat invoice...
                    </div>
                  )}

                  {/* EWALLET */}
                  <div>
                    <div className="mb-2 text-sm font-bold sticky top-0 bg-zinc-950 py-2">
                      E-Wallet
                    </div>
                    <div className="space-y-2">
                      {payment.ewallets.map((w, idx) => (
                        <button
                          key={`${w.provider}-${idx}`}
                          onClick={() => chooseEwallet(w)}
                          disabled={invoiceLoading}
                          className={`w-full text-left rounded-xl border border-white/10 p-3 ${
                            invoiceLoading
                              ? "bg-white/5 opacity-60"
                              : "bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <div className="text-sm font-semibold">
                            {w.provider}
                          </div>
                          <div className="text-xs text-zinc-400">
                            {w.account_name}
                          </div>
                          <div className="mt-1 font-mono text-sm">
                            {w.number}
                          </div>
                          <div className="mt-2 text-xs text-emerald-300">
                            Pilih metode ini
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* BANK */}
                  <div>
                    <div className="mb-2 text-sm font-bold sticky top-0 bg-zinc-950 py-2">
                      Bank Transfer
                    </div>
                    <div className="space-y-2">
                      {payment.bank_accounts.map((b, idx) => (
                        <button
                          key={`${b.bank}-${idx}`}
                          onClick={() => chooseBank(b)}
                          disabled={invoiceLoading}
                          className={`w-full text-left rounded-xl border border-white/10 p-3 ${
                            invoiceLoading
                              ? "bg-white/5 opacity-60"
                              : "bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <div className="text-sm font-semibold">{b.bank}</div>
                          <div className="text-xs text-zinc-400">
                            {b.account_name}
                          </div>
                          <div className="mt-1 font-mono text-sm">
                            {b.account_number}
                          </div>
                          <div className="mt-2 text-xs text-emerald-300">
                            Pilih metode ini
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SUMMARY */}
              {!paymentLoading &&
                payment &&
                step === "summary" &&
                selectedMethod && (
                  <>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="mb-2 text-sm font-bold">Rangkuman</div>
                      <div className="text-sm text-zinc-200 space-y-2">
                        <div className="flex justify-between gap-3">
                          <span className="text-zinc-400">Produk</span>
                          <span className="font-semibold">
                            {product?.name ?? "-"}
                          </span>
                        </div>

                        <div className="flex justify-between gap-3">
                          <span className="text-zinc-400">Harga</span>
                          <span className="font-semibold">
                            Rp {product?.price?.toLocaleString("id-ID") ?? "-"}
                          </span>
                        </div>

                        <div className="flex justify-between gap-3">
                          <span className="text-zinc-400">User ID</span>
                          <span className="font-mono">{userId}</span>
                        </div>

                        {isML && (
                          <div className="flex justify-between gap-3">
                            <span className="text-zinc-400">Zone ID</span>
                            <span className="font-mono">{zoneId}</span>
                          </div>
                        )}

                        <div className="flex justify-between gap-3">
                          <span className="text-zinc-400">WhatsApp</span>
                          <span className="font-mono">{wa}</span>
                        </div>

                        <div className="flex justify-between gap-3">
                          <span className="text-zinc-400">Metode</span>
                          <span className="font-semibold">
                            {selectedMethod.type === "bank"
                              ? `Bank Transfer (${selectedMethod.label})`
                              : `E-Wallet (${selectedMethod.label})`}
                          </span>
                        </div>

                        {invoice?.invoice_id && (
                          <div className="flex justify-between gap-3">
                            <span className="text-zinc-400">Invoice</span>
                            <span className="font-mono">
                              {invoice.invoice_id}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="mb-2 text-sm font-bold">
                        Tujuan Pembayaran
                      </div>

                      {selectedMethod.type === "bank" ? (
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold">
                              {selectedMethod.label}
                            </div>
                            <div className="text-xs text-zinc-400">
                              {selectedMethod.account_name}
                            </div>
                            <div className="mt-1 font-mono text-sm">
                              {selectedMethod.account_number}
                            </div>
                          </div>
                          <button
                            className="rounded-xl bg-white/10 px-3 py-2 text-xs hover:bg-white/15"
                            onClick={() =>
                              copyText(selectedMethod.account_number)
                            }
                          >
                            Copy
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold">
                              {selectedMethod.label}
                            </div>
                            <div className="text-xs text-zinc-400">
                              {selectedMethod.account_name}
                            </div>
                            <div className="mt-1 font-mono text-sm">
                              {selectedMethod.number}
                            </div>
                          </div>
                          <button
                            className="rounded-xl bg-white/10 px-3 py-2 text-xs hover:bg-white/15"
                            onClick={() => copyText(selectedMethod.number)}
                          >
                            Copy
                          </button>
                        </div>
                      )}
                    </div>

                      <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-200">
                        <div className="mb-1 text-xs font-semibold text-zinc-400">
                          Catatan
                        </div>
                        Pesanan sedang diverifikasi oleh admin
                      </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setStep("select");
                          setInvoice(null);
                          setInvoiceError(null);
                        }}
                        className="w-1/2 rounded-xl bg-white/10 py-3 font-bold text-white hover:bg-white/15"
                      >
                        Ganti Metode
                      </button>

                      <button
                        onClick={handleAlreadyPaid}
                        disabled={invoiceLoading}
                        className={`w-1/2 rounded-xl py-3 font-bold text-white ${
                          invoiceLoading
                            ? "bg-emerald-500/40 cursor-not-allowed"
                            : "bg-emerald-500/80 hover:bg-emerald-500"
                        }`}
                      >
                        Saya sudah bayar
                      </button>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
