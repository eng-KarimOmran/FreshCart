import { useFormik } from "formik";
import InputForm from "../InputForm/InputForm";
import * as Yup from "yup";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { cartContext } from "../Context/CartFu";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CheckOut() {
  const inputs = [
    {
      id: "address",
      type: "text",
      name: "details",
      label: "Detailed address:",
      matches: /^(?! )[A-Za-z ]{3,}(?<! )$/,
    },
    {
      id: "phone",
      type: "text",
      name: "phone",
      label: "phone :",
      matches: /^01[0125][0-9]{8}$/,
    },
    {
      id: "city",
      type: "text",
      name: "city",
      label: "city :",
      matches: /^(?! )[A-Za-z ]{3,}(?<! )$/,
    },
  ];
  const [loading, setLoading] = useState(false);
  const { PaymentProducts, refetch } = useContext(cartContext);
  const navigate = useNavigate();
  const Submit = async (value) => {
    try {
      setLoading(true);
      const request = await PaymentProducts(value);
      if (request.data.status == "success") {
        refetch();
        if (request.data.session === undefined) {
          navigate("/all-orders");
        } else {
          window.location = request.data.session.url;
        }
      }
    } finally {
      setLoading(false);
    }
  };
  const validationSchema = Yup.object().shape({
    details: Yup.string()
      .required()
      .matches(inputs[0].matches, "Invalid address."),
    phone: Yup.string().required().matches(inputs[1].matches, "Invalid phone."),
    city: Yup.string().required().matches(inputs[2].matches, "Invalid city."),
    paymentMethod: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: "",
    },
    onSubmit: Submit,
    validationSchema: validationSchema,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="container py-10">
        {inputs.map((input) => (
          <div key={input.id}>
            <InputForm
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values[input.name]}
              data={input}
            />
            {formik.errors[input.name] && formik.touched[input.name] && (
              <ErrorMessage errorMessage={formik.errors[input.name]} />
            )}
          </div>
        ))}

        <div>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value="cash"
            id="CashPayment"
            className="mt-3 me-1"
            type="radio"
            name="paymentMethod"
          />
          <label htmlFor="CashPayment">Cash payment</label>
        </div>
        <div>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value="creditCard"
            id="CreditCardPayment"
            className="mt-3 me-1"
            type="radio"
            name="paymentMethod"
          />
          <label htmlFor="CreditCardPayment">Credit card payment</label>
        </div>
        <div className="text-center">
          <button
            disabled={loading}
            type="submit"
            className={`py-3 my-4 px-8 text-xl border-2 border-black/15 rounded-lg ${
              formik.isValid && !loading && formik.dirty
                ? "bg-blue-400 text-white"
                : "text-black/15 hover:cursor-not-allowed "
            }`}
          >
            {loading ? "loading..." : "Pay now"}
          </button>
        </div>
      </form>
    </>
  );
}
