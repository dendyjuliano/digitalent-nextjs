import { combineReducers } from "redux";

// PUBLIKASI
import {
  allArtikelReducer,
  newArtikelReducer,
  deleteArtikelReducer,
  detailArtikelReducer,
  updateArtikelReducer,
} from "./publikasi/artikel.reducers";
import {
  allArtikelPesertaReducer,
  newArtikelPesertaReducer,
  deleteArtikelPesertaReducer,
  detailArtikelPesertaReducer,
  updateArtikelPesertaReducer,
} from "./publikasi/artikel-peserta.reducers";
import {
  allBeritaReducer,
  newBeritaReducer,
  deleteBeritaReducer,
  detailBeritaReducer,
  updateBeritaReducer,
} from "./publikasi/berita.reducers";
import {
  allImagetronReducer,
  newImagetronReducer,
  deleteImagetronReducer,
  detailImagetronReducer,
  updateImagetronReducer,
} from "./publikasi/imagetron.reducers";
import {
  allKategoriReducer,
  paginationKategoriReducer,
  newKategoriReducer,
  deleteKategoriReducer,
  detailKategoriReducer,
  updateKategoriReducer,
} from "./publikasi/kategori.reducers";
import {
  allGaleriReducer,
  newGaleriReducer,
  detailGaleriReducer,
  deleteGaleriReducer,
  updateGaleriReducer,
  viewGaleriReducer,
} from "./publikasi/galeri.reducers";
import {
  allFaqReducer,
  paginationFaqReducer,
  newFaqReducer,
  deleteFaqReducer,
  detailFaqReducer,
  updateFaqReducer,
  updatePinFaqReducer,
} from "./publikasi/faq.reducers";
import {
  allVideoReducer,
  newVideoReducer,
  deleteVideoReducer,
  detailVideoReducer,
  updateVideoReducer,
  playVideoReducer,
} from "./publikasi/video.reducers";

import {
  allSettingPublikasiReducer,
  updateSettingPublikasiReducer,
} from "./publikasi/setting.reducers";

import { allDashboardPublikasiReducer } from "./publikasi/dashboard-publikasi.reducers";

// Subvit
// ============== substansi ===============
import {
  allSubtanceQuestionBanksReducer,
  newSubtanceQuestionBanksReducer,
  detailSubtanceQuestionBanksReducer,
  updateSubtanceQuestionReducer,
  deleteSubtanceQuestionBanksReducer,
  updateSubtanceQuestionBanksPublishReducer,
  allReportSubtanceQuestionBanksReducer,
  newCloneSubtanceQuestionBanksReducer,
} from "./subvit/subtance.reducers";
import {
  allSubtanceQuestionTypeReducer,
  newSubtanceQuestionTypeReducer,
  detailSubtanceQuestionTypeReducer,
  deleteSubtanceQuestionTypeReducer,
  updateSubtanceQuestionTypeReducer,
} from "./subvit/subtance-question-type.reducers";
import {
  allSubtanceQuestionDetailReducer,
  newSubtanceQuestionDetailReducer,
  deleteSubtanceQuestionDetailReducer,
  detailSubtanceQuestionDetailReducer,
  updateSubtanceQuestionDetailReducer,
  importFileSubtanceQuestionDetailReducer,
  importImagesSubtanceQuestionDetailReducer,
} from "./subvit/subtance-question-detail.reducers";
// ============== substansi ===============

// ============== survey ===============
import {
  allSurveyQuestionBanksReducer,
  newSurveyQuestionBanksReducer,
  detailSurveyQuestionBanksReducer,
  updateSurveyQuestionReducer,
  deleteSurveyQuestionBanksReducer,
  updateSurveyQuestionBanksPublishReducer,
  allReportSurveyQuestionBanksReducer,
} from "./subvit/survey-question.reducers";
import {
  allSurveyQuestionDetailReducer,
  newSurveyQuestionDetailReducer,
  deleteSurveyQuestionDetailReducer,
  detailSurveyQuestionDetailReducer,
  updateSurveyQuestionDetailReducer,
  importFileSurveyQuestionDetailReducer,
  importImagesSurveyQuestionDetailReducer,
} from "./subvit/survey-question-detail.reducers";
// ============== survey ===============

// ============== trivia ===============
import {
  allTriviaQuestionBanksReducer,
  newTriviaQuestionBanksReducer,
  detailTriviaQuestionBanksReducer,
  updateTriviaQuestionReducer,
  deleteTriviaQuestionBanksReducer,
  updateTriviaQuestionBanksPublishReducer,
  allReportTriviaQuestionBanksReducer,
} from "./subvit/trivia-question.reducers";
import {
  allTriviaQuestionDetailReducer,
  newTriviaQuestionDetailReducer,
  deleteTriviaQuestionDetailReducer,
  detailTriviaQuestionDetailReducer,
  updateTriviaQuestionDetailReducer,
  importFileTriviaQuestionDetailReducer,
  importImagesTriviaQuestionDetailReducer,
} from "./subvit/trivia-question-detail.reducers";
// ============== trivia ===============

// ============== sertifikat ===============
import {
  allSertifikatReducers,
  deleteSertifikatReducer,
  detailSertifikatReducer,
  newSertifikatReducer,
  updateSertifikatReducer,
  singleSertifikatReducer,
  publishedSertifikatReducer,
} from "./sertifikat/sertifikat.reducers";

import {
  allPesertaReducers,
  detailPesertaReducer,
} from "./sertifikat/list-peserta.reducer";
// ============== sertifikat ===============

// start Partnership
import { allMitraReducer } from "./partnership/mitra.reducers";

//
// ================= admin
// category management kerjasama
import { allMKCooporationReducer } from "./partnership/mk_cooporation.reducers";
// management kerjasama
import { allMCooporationReducerMK } from "./partnership/managementCooporation.reducer";
import { allTandaTanganReducer } from "./partnership/tandaTangan.reducers";
// ================== user
import { authenticationReducer } from "./partnership/user/authentication.reducer";
import { cooperationUserReducer } from "./partnership/user/cooperation.reducer";
import { dashboardReducer } from "./partnership/dashboard.reducer";
import { allTandaTanganUserReducer } from "./partnership/user/tanda-tangan.reducer";
// end Partnership

// Site Management
// ============== role ===============
import {
  allPageReducer,
  deletePageReducer,
  newPageReducer,
  detailPageReducer,
  updatePageReducer,
} from "./site-management/settings/page.reducer";
import {
  allRolesReducer,
  newRolesReducer,
  detailRolesReducer,
  updateRoleReducer,
  deleteRolesReducer,
} from "./site-management/role.reducers";

// ============== master-satuan-penyelenggara ===============
import {
  allMasterSatuanKerjaPenyelenggarasReducer,
  newMasterSatuanKerjaPenyelenggarasReducer,
  detailMasterSatuanKerjaPenyelenggarasReducer,
  updateMasterSatuanKerjaPenyelenggaraReducer,
  deleteMasterSatuanKerjaPenyelenggarasReducer,
} from "./site-management/master-satuan-kerja-penyelenggara.reducers";
// End Site Management

//PELATIHAN
// ====================== akademi =====================
import {
  allAcademyReducer,
  newAcademyReducer,
  detailAcademyReducer,
  updateAcademyReducer,
  deleteAcademyReducer,
} from "./pelatihan/academy.reducers";

// ====================== tema =====================
import {
  allThemeReducer,
  newThemeReducer,
  detailThemeReducer,
  updateThemeReducer,
  deleteThemeReducer,
} from "./pelatihan/theme.reducers";

// ====================== pelatihan =====================
import {
  newTrainingReducer,
  allTrainingReducer,
  deleteTrainingReducer,
} from "./pelatihan/training.reducers";
//END PELATIHAN

// functional reducer

import {
  trainingStep1Reducer,
  registrationStep2Reducer,
  commitmentStep3Reducer,
} from "./pelatihan/function.reducers";
import { allProvinsiReducer, allKotaReducer } from "./utils/utils.reducers";
import { reducerFunctionals } from "./utils/functionals.reducer";

const reducer = combineReducers({
  // PUBLIKASI
  allArtikel: allArtikelReducer,
  newArtikel: newArtikelReducer,
  deleteArtikel: deleteArtikelReducer,
  detailArtikel: detailArtikelReducer,
  updatedArtikel: updateArtikelReducer,

  allArtikelPeserta: allArtikelPesertaReducer,
  newArtikelPeserta: newArtikelPesertaReducer,
  deleteArtikelPeserta: deleteArtikelPesertaReducer,
  detailArtikelPeserta: detailArtikelPesertaReducer,
  updatedArtikelPeserta: updateArtikelPesertaReducer,

  allBerita: allBeritaReducer,
  newBerita: newBeritaReducer,
  deleteBerita: deleteBeritaReducer,
  detailBerita: detailBeritaReducer,
  updatedBerita: updateBeritaReducer,

  allImagetron: allImagetronReducer,
  newImagetron: newImagetronReducer,
  deleteImagetron: deleteImagetronReducer,
  detailImagetron: detailImagetronReducer,
  updatedImagetron: updateImagetronReducer,

  allGaleri: allGaleriReducer,
  newGaleri: newGaleriReducer,
  detailGaleri: detailGaleriReducer,
  deleteGaleri: deleteGaleriReducer,
  updatedGaleri: updateGaleriReducer,
  viewedGaleri: viewGaleriReducer,

  allFaq: allFaqReducer,
  newFaq: newFaqReducer,
  paginationFaq: paginationFaqReducer,
  deleteFaq: deleteFaqReducer,
  detailFaq: detailFaqReducer,
  updateFaq: updateFaqReducer,
  updatePinFaq: updatePinFaqReducer,

  allVideo: allVideoReducer,
  newVideo: newVideoReducer,
  deleteVideo: deleteVideoReducer,
  detailVideo: detailVideoReducer,
  updatedVideo: updateVideoReducer,
  playedVideo: playVideoReducer,

  allKategori: allKategoriReducer,
  paginationKategori: paginationKategoriReducer,
  newKategori: newKategoriReducer,
  deleteKategori: deleteKategoriReducer,
  detailKategori: detailKategoriReducer,
  updateKategori: updateKategoriReducer,

  allSettingPublikasi: allSettingPublikasiReducer,
  updateSettingPublikasi: updateSettingPublikasiReducer,

  allDashboardPublikasi: allDashboardPublikasiReducer,

  // Subvit
  // =============== substansi ==================
  allSubtanceQuestionBanks: allSubtanceQuestionBanksReducer,
  newSubtanceQuestionBanks: newSubtanceQuestionBanksReducer,
  deleteSubtanceQuestionBanks: deleteSubtanceQuestionBanksReducer,
  detailSubtanceQuestionBanks: detailSubtanceQuestionBanksReducer,
  updateSubtanceQuestion: updateSubtanceQuestionReducer,
  updateSubtanceQuestionBanksPublish: updateSubtanceQuestionBanksPublishReducer,
  allReportSubtanceQuestionBanks: allReportSubtanceQuestionBanksReducer,
  newCloneSubtanceQuestionBanks: newCloneSubtanceQuestionBanksReducer,

  allSubtanceQuestionType: allSubtanceQuestionTypeReducer,
  newSubtanceQuestionType: newSubtanceQuestionTypeReducer,
  detailSubtanceQuestionType: detailSubtanceQuestionTypeReducer,
  deleteSubtanceQuestionType: deleteSubtanceQuestionTypeReducer,
  updateSubtanceQuestionType: updateSubtanceQuestionTypeReducer,

  allSubtanceQuestionDetail: allSubtanceQuestionDetailReducer,
  newSubtanceQuestionDetail: newSubtanceQuestionDetailReducer,
  detailSubtanceQuestionDetail: detailSubtanceQuestionDetailReducer,
  updateSubtanceQuestionDetail: updateSubtanceQuestionDetailReducer,
  deleteSubtanceQuestionDetail: deleteSubtanceQuestionDetailReducer,
  importFileSubtanceQuestionDetail: importFileSubtanceQuestionDetailReducer,
  importImagesSubtanceQuestionDetail: importImagesSubtanceQuestionDetailReducer,
  // =============== end substansi ==================

  // =============== survey ==================
  allSurveyQuestionBanks: allSurveyQuestionBanksReducer,
  newSurveyQuestionBanks: newSurveyQuestionBanksReducer,
  deleteSurveyQuestionBanks: deleteSurveyQuestionBanksReducer,
  detailSurveyQuestionBanks: detailSurveyQuestionBanksReducer,
  updateSurveyQuestion: updateSurveyQuestionReducer,
  updateSurveyQuestionBanksPublish: updateSurveyQuestionBanksPublishReducer,
  allReportSurveyQuestionBanks: allReportSurveyQuestionBanksReducer,

  allSurveyQuestionDetail: allSurveyQuestionDetailReducer,
  newSurveyQuestionDetail: newSurveyQuestionDetailReducer,
  deleteSurveyQuestionDetail: deleteSurveyQuestionDetailReducer,
  detailSurveyQuestionDetail: detailSurveyQuestionDetailReducer,
  updateSurveyQuestionDetail: updateSurveyQuestionDetailReducer,
  importFileSurveyQuestionDetail: importFileSurveyQuestionDetailReducer,
  importImagesSurveyQuestionDetail: importImagesSurveyQuestionDetailReducer,
  // =============== end substansi ==================

  // =============== trivia ==================
  allTriviaQuestionBanks: allTriviaQuestionBanksReducer,
  newTriviaQuestionBanks: newTriviaQuestionBanksReducer,
  deleteTriviaQuestionBanks: deleteTriviaQuestionBanksReducer,
  detailTriviaQuestionBanks: detailTriviaQuestionBanksReducer,
  updateTriviaQuestion: updateTriviaQuestionReducer,
  updateTriviaQuestionBanksPublish: updateTriviaQuestionBanksPublishReducer,
  allReportTriviaQuestionBanks: allReportTriviaQuestionBanksReducer,

  allTriviaQuestionDetail: allTriviaQuestionDetailReducer,
  newTriviaQuestionDetail: newTriviaQuestionDetailReducer,
  deleteTriviaQuestionDetail: deleteTriviaQuestionDetailReducer,
  detailTriviaQuestionDetail: detailTriviaQuestionDetailReducer,
  updateTriviaQuestionDetail: updateTriviaQuestionDetailReducer,
  importFileTriviaQuestionDetail: importFileTriviaQuestionDetailReducer,
  importImagesTriviaQuestionDetail: importImagesTriviaQuestionDetailReducer,
  // =============== end trivia ==================

  // =============== sertifikat ==================
  allCertificates: allSertifikatReducers,
  newCertificates: newSertifikatReducer,
  singleCertificate: singleSertifikatReducer,
  detailCertificates: detailSertifikatReducer,
  deleteCertificates: deleteSertifikatReducer,
  updateCertificates: updateSertifikatReducer,
  publishCertificate: publishedSertifikatReducer,

  allParticipant: allPesertaReducers,
  detailParticipant: detailPesertaReducer,
  // =============== end sertifikat ==================

  // PARTNERSHIP
  // ================================= => admin
  // kerjasama mitra
  allMitra: allMitraReducer,
  // category management kerjasama
  allMKCooporation: allMKCooporationReducer,
  // management kerjasama
  allMK: allMCooporationReducerMK,
  // tanda tangan
  allTandaTangan: allTandaTanganReducer,
  // dashboard
  allDashboard: dashboardReducer,

  // ================================= => user
  allCooperationUser: cooperationUserReducer,
  allTandaTanganUser: allTandaTanganUserReducer,
  allProvinsi: allProvinsiReducer,
  allKota: allKotaReducer,
  allFunctionls: reducerFunctionals,
  allAuthentication: authenticationReducer,

  // SITE MANAGEMENT
  // ============ PAGE =======
  allPage: allPageReducer,
  deletePage: deletePageReducer,
  newPage: newPageReducer,
  detailPage: detailPageReducer,
  updatePage: updatePageReducer,
  // ============== ROLE ============
  allMasterSatuanKerjaPenyelenggaras: allMasterSatuanKerjaPenyelenggarasReducer,
  newMasterSatuanKerjaPenyelenggaras: newMasterSatuanKerjaPenyelenggarasReducer,
  deleteMasterSatuanKerjaPenyelenggaras:
    deleteMasterSatuanKerjaPenyelenggarasReducer,
  detailMasterSatuanKerjaPenyelenggaras:
    detailMasterSatuanKerjaPenyelenggarasReducer,
  updateMasterSatuanKerjaPenyelenggara:
    updateMasterSatuanKerjaPenyelenggaraReducer,

  // ============== END ROLE ============

  // END SITE MANAGEMENT

  //PELATIHAN
  // ========== akademi ===========
  allAcademy: allAcademyReducer,
  newAcademy: newAcademyReducer,
  detailAcademy: detailAcademyReducer,
  updateAcademy: updateAcademyReducer,
  deleteAcademy: deleteAcademyReducer,
  // ========== tema ===========
  allTheme: allThemeReducer,
  newTheme: newThemeReducer,
  detailTheme: detailThemeReducer,
  updateTheme: updateThemeReducer,
  deleteTheme: deleteThemeReducer,
  // ========== pelatihan ===========
  allTraining: allTrainingReducer,
  newTraining: newTrainingReducer,
  deleteTraining: deleteTrainingReducer,

  trainingStep1: trainingStep1Reducer,
  registrationStep2: registrationStep2Reducer,
  commitmentStep3: commitmentStep3Reducer,
  //END PELATIHAN
});

export default reducer;
