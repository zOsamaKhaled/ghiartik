import { Button } from "@heroui/button";
import { invoices } from "@/config/invoices";
import { useDispatch } from "react-redux";
import { closeModal } from "@/features/mainModal/mainModalSlice";
import { IoClose, IoPrint } from "react-icons/io5";

export default function InvoiceModal() {
  const dispatch = useDispatch();
  const invoiceId =
    typeof window !== "undefined" ? localStorage.getItem("invoiceId") : null;

  // find the invoice by id, fallback to first invoice if not found
  const invoice =
    invoices.find((inv: any) => inv.id === invoiceId) || invoices[0];
  const products = Array.isArray(invoice.products) ? invoice.products : [];
  const subtotal = products.reduce(
    (s: number, p: any) => s + (p.price || 0) * (p.quantity || 1),
    0
  );
  const tax = 0;
  const discount = 0;

  const handleClose = () => {
    if (typeof window !== "undefined") localStorage.removeItem("invoiceId");
    dispatch(closeModal());
  };

  if (!invoice) return null;

  return (
    <div className="relative flex flex-col w-full gap-4 p-4 pb-1">
      <div className="absolute top-[-20px] left-[-20px] flex ">
        <Button
          isIconOnly
          className="bg-transparent rounded-full text-primary hover:bg-primary/70 hover:text-white"
          onPress={handleClose}
          startContent={<IoClose className="text-lg" />}
        ></Button>
      </div>
      <div className="flex items-center justify-between">
        <h4>تفاصيل الفاتورة</h4>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-light-black">رقم الفاتورة:</p>
          <p className="text-sm font-medium">{invoice.invoice_number}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-light-black">التاريخ:</p>
          <p className="text-sm font-medium">{invoice.date}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-light-black">إجمالي الفاتورة:</p>
          <p className="text-sm font-medium">
            {Math.round(invoice.total_amount || 0)} ريال
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-light-black">طريقة الدفع:</p>
          <p className="text-sm font-medium">{invoice.payment_method}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-light-black">اسم التاجر:</p>
          <p className="text-sm font-medium">{invoice.vendor_name}</p>
        </div>
      </div>

      <hr className="my-2 text-black/10" />

      <div className="flex flex-col gap-3">
        <h3 className="font-medium">المنتجات</h3>
        {products.length > 0 ? (
          products.map((it: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between ">
              <p className="text-sm text-light-black">{it.name}</p>
              <p dir="ltr" className="text-sm font-medium">
                {it.quantity} x {it.price} {invoice.currency || ""}
              </p>
            </div>
          ))
        ) : (
          <div className="text-sm text-light-black">لا توجد منتجات مفصّلة</div>
        )}
      </div>

      <hr className="my-2 text-black/10" />

      <div className="flex items-center justify-between">
        <p className="text-sm text-light-black">المجموع الفرعي:</p>
        <p className="text-sm font-medium">
          {Math.round(subtotal)} {invoice.currency || ""}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-light-black">الضرائب:</p>
        <p className="text-sm font-medium">
          {Math.round(tax)} {invoice.currency || ""}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-light-black">الخصم:</p>
        <p className="text-sm font-medium">
          {Math.round(discount)} {invoice.currency || ""}
        </p>
      </div>

      <hr className="my-2 text-black/10" />
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">الإجمالي النهائي:</p>
        <p className="text-lg font-bold">
          {Math.round(invoice.total_amount || 0)} ريال
        </p>
      </div>

      <div className="flex justify-center mt-4 ">
        <Button
          onPress={() => window.print()}
          endContent={<IoPrint size={20} />}
          className="bg-transparent text-primary border-1 border-primary hover:text-white hover:bg-primary "
        >
          طباعة PDF
        </Button>
      </div>
    </div>
  );
}
