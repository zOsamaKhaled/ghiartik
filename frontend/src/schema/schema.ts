import { z } from "zod";
export const schema = z
  .object({
    name: z
      .string()
      .nonempty("الاسم مطلوب")
      .min(3, "الاسم يجب أن يكون على الأقل 3 حروف")
      .max(20, "الاسم طويل جدًا"),
    email: z
      .string()
      .nonempty("البريد الإلكتروني مطلوب")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "بريد إلكتروني غير صحيح"
      ),
    phone: z
      .string()
      .nonempty("رقم الجوال مطلوب")
      .min(9, "رقم الهاتف يجب ان يكون على الاقل 9 أرقام")
      .max(9, "رقم الهاتف طويل جدًا")
      .regex(/^5\d{8}$/, "من فضلك أدخل رقم سعودي صحيح"),
    password: z
      .string()
      .nonempty("كلمة المرور مطلوبة")
      .min(6, "كلمة السر يجب أن تكون على الأقل 6 حروف")
      .max(20, "كلمة السر طويلة جدًا")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
        " يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم وحرف خاص"
      ),
    repassword: z.string().nonempty("تاكيد كلمة المرور مطلوبة"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "يجب الموافقة على الشروط والأحكام",
    }),
    shopName: z
      .string()
      .nonempty("اسم المتجر مطلوب")
      .min(3, "الاسم يجب أن يكون على الأقل 3 حروف")
      .max(30, "الاسم طويل جدًا"),
    shopLogo: z
      .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
        message: "يجب رفع شعار المتجر",
      })
      .refine((files) => files && files[0]?.type.startsWith("image/"), {
        message: "يجب أن تكون الصورة من نوع PNG أو JPG",
      })
      .refine((files) => files && files[0]?.size <= 2 * 1024 * 1024, {
        message: "حجم الصورة يجب ألا يتجاوز 2 ميجابايت",
      }),
    shopDescription: z
      .string()
      .nonempty("وصف المتجر مطلوب")
      .min(10, "وصف المتجر يجب ان يكون على الاقل 10 حروف")
      .max(300, "وصف المتجر يجب ان يكون على الاقل 300 حروف"),
    city: z.string().nonempty("المدينة مطلوبة"),
    shopAddress: z
      .string()
      .nonempty("عنوان المتجر مطلوب")
      .max(50, "عنوان المتجر يجب ان يكون على الأكثر 50 حروف"),
    shopCR: z.string().optional(),
    shopTN: z.string().optional(),
    shopCRFile: z
      .custom<FileList | undefined>(
        (val) => !val || (val instanceof FileList && val.length > 0),
        {
          message: "يجب إرفاق السجل التجاري",
        }
      )
      .optional(),
    shopWebsite: z.string().optional(),
    shopIBAN: z
      .string()
      .regex(/^([A-Z]{2}[0-9]{2})([A-Z0-9]{1,30})$/, "رقم IBAN غير صحيح"),
    shopIBANConfirm: z.string().nonempty("تاكيد رقم IBAN مطلوب"),
    brands: z
      .array(z.string())
      .min(1, "يجب اختيار علامة تجارية واحدة على الأقل"),
    models: z.array(z.string()).min(1, "يجب اختيار موديل واحد على الأقل"),
    shopTermsFile: z
      .custom<FileList | undefined>(
        (val) => !val || (val instanceof FileList && val.length > 0),
        {
          message: "يجب إرفاق السجل التجاري",
        }
      )
      .optional(),
  })
  .refine((data) => data.password === data.repassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["repassword"],
  })
  .refine((data) => data.shopIBAN === data.shopIBANConfirm, {
    message: "رقم IBAN غير متطابق",
    path: ["shopIBANConfirm"],
  });
