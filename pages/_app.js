import "../styles/globals.css";
import "../styles/styleCustomUtilities.css";
import "react-datepicker/dist/react-datepicker.css";
import "../components/Table/tableStyle.css";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";

import SimpleReactValidator from "simple-react-validator";
import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  SimpleReactValidator.addLocale("id", {
    accepted: ":attribute harus diterima.",
    after: ":attribute harus lebih dari :date.",
    after_or_equal: ":attribute harus lebih dari atau sama dengan :date.",
    alpha: ":attribute hanya boleh berisikan teks.",
    alpha_space: ":attribute hanya boleh berisikan teks dan spasi.",
    alpha_num: ":attribute hanya boleh berisikan teks dan angka.",
    alpha_num_space: ":attribute hanya boleh berisikan teks, angka, dan spasi.",
    alpha_num_dash:
      ":attribute hanya boleh berisikan teks, angka, dan garis datar.",
    alpha_num_dash_space:
      ":attribute hanya boleh berisikan teks, angka, garis datar dan spasi.",
    array: ":attribute harus berupa array.",
    before: ":attribute harus kurang dari :date.",
    before_or_equal: ":attribute harus kurang dari atau sama dengan :date.",
    between: ":attribute harus diantara :min dan :max:type.",
    boolean: ":attribute harus berupa boolean.",
    card_exp:
      ":attribute harus berupa tanggal expire yang valid valid expiration date.",
    card_num: ":attribute harus berupa nomor kartu kredit.",
    currency: ":attribute harus berupa mata uang yang valid.",
    date: ":attribute harus berupa tanggal.",
    date_equals: ":attribute harus sama dengan :date.",
    email: ":attribute harus berupa alamat email yang valid.",
    in: ":attribute terpilih harus :values.",
    integer: ":attribute harus berupa integer.",
    max: ":attribute harus kurang dari :max:type.",
    min: ":attribute harus lebih dari :min:type.",
    not_in: ":attribute terpilih tidak boleh sama dengan :values.",
    not_regex: ":attribute tidak boleh cocok dengan pola yang ditentukan.",
    numeric: ":attribute harus berupa angka.",
    phone: ":attribute harus berupa nomor ponsel yang valid.",
    regex: ":attribute harus cocok dengan pola yang ditentukan.",
    required: ":attribute tidak boleh kosong.",
    size: ":attribute harus :size:type.",
    string: ":attribute harus berupa string.",
    typeof: ":attribute tidak cocok dengan tipe :type.",
    url: ":attribute harus berupa url.",
  });

  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
