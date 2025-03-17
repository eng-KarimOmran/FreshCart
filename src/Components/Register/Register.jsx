import InputForm from "../InputForm/InputForm";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserStatus } from "./../Context/UserStatus";
import * as Yup from "yup";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
export default function Register() {
  const [isLodding, setIsLodding] = useState(false);
  const inputs = [
    {
      id: "name",
      type: "text",
      name: "name",
      label: "Name :",
      matches: /^(?! )[A-Za-z ]{3,}(?<! )$/,
    },
    {
      id: "email",
      type: "email",
      name: "email",
      label: "Email :",
      matches: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      label: "Password :",
      matches: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    },
    {
      id: "RePassword",
      type: "password",
      name: "rePassword",
      label: "Re-Password :",
    },
    {
      id: "phone",
      type: "tel",
      name: "phone",
      label: "Phone :",
      matches: /^01[0125][0-9]{8}$/,
    },
  ];
  const navigate = useNavigate();
  const { setToken } = useContext(UserStatus);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required()
      .matches(
        inputs[0].matches,
        "The name must not start or end with a space and must have at least three letters."
      ),
    email: Yup.string().required().matches(inputs[1].matches, "Invalid email."),
    password: Yup.string()
      .required()
      .matches(
        inputs[2].matches,
        "Your password must contain a lowercase letter, an uppercase letter, a number, and be at least 8 characters long."
      ),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Password does not match."),
    phone: Yup.string()
      .required()
      .matches(
        inputs[4].matches,
        "You must enter a valid Egyptian number without the country code."
      ),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: async function (values) {
      try {
        setIsLodding(true);
        const request = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
        if (request.data.message == "success") {
          localStorage.setItem("Token", request.data.token);
          setToken(request.data.token);
          navigate("/home");
        }
      } finally {
        setIsLodding(false);
      }
    },
    validationSchema: validationSchema,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="container">
        <h2 className="font-bold text-black/85 text-3xl my-4">Register now</h2>
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
        <button
          type="submit"
          className={`p-3 mt-1 text-xl border-2 border-black/15 rounded-lg ${
            formik.isValid && formik.dirty
              ? "bg-green-500 text-white"
              : "text-black/15 hover:cursor-not-allowed "
          }`}
        >
          {isLodding ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-6 h-6 me-1 text-gray-200 animate-spin dark:text-gray-600 fill-green-500 inline-block"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              Lodding...
            </div>
          ) : (
            "Register now"
          )}
        </button>
      </form>
    </>
  );
}
