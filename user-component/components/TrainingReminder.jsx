import React, { useState, useEffect } from "react";
import Image from "next/image";
import Select from "react-select";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  addNotifTema,
  clearErrors,
} from "../../redux/actions/beranda/beranda.actions";
import { CLEAR_ERRORS_NOTIF } from "../../redux/types/beranda/beranda.type";

const TrainingReminder = ({ session }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { notifikasiTema, loading, error, success } = useSelector(
    (state) => state.addNotifTema
  );

  const [temaId, setTemaId] = useState(null);
  const optionsTema = [];

  if (true) {
    for (let index = 0; index < 5; index++) {
      let val = {
        value: index,
        label: "Tema " + index,
      };
      optionsTema.push(val);
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS_NOTIF });
    }
  }, [error, dispatch]);

  const customStyles = {
    control: (styles) => ({
      ...styles,
      borderRadius: "30px",
      paddingLeft: "10px",
    }),
  };

  const handleTemaNotif = () => {
    let temaArr = [];
    temaId !== null &&
      temaId.forEach((row, i) => {
        temaArr.push(row.value);
      });
    const data = {
      tema_id: temaArr.join(","),
    };

    if (session) {
      dispatch(addNotifTema(data, session.token));
    } else {
      router.push(`/login`);
    }
  };

  return (
    <div className="p-10 rounded mb-10" style={{ backgroundColor: "#E6F2FF" }}>
      <div className="d-flex align-items-center mb-3">
        <div>
          <Image src={`/assets/media/logo-bell.svg`} width={32} height={32} />
        </div>

        <h4 className="fw-600 fz-20 ml-4">Buat Pengingat Pelatihan</h4>
      </div>

      <p className="fz-14 mb-9" style={{ color: "#6C6C6C" }}>
        Jangan sampai ketinggalan informasi, buat pengingat pelatihan sekarang
        juga.
      </p>

      <div className="d-flex">
        <div className="w-100">
          <Select
            options={optionsTema}
            styles={customStyles}
            placeholder="Cari Tema"
            isMulti
            onChange={(e) => setTemaId(e)}
          />
        </div>
        <button
          className="btn btn-primary rounded-pill text-white fw-600 px-5 ml-4"
          onClick={() => handleTemaNotif()}
        >
          Buat
        </button>
      </div>
    </div>
  );
};

export default TrainingReminder;
