//import { useScrollTrigger } from '@material-ui/core';
import { db } from "../firebase_config";
const dbCollectionName = db.collection("users");
const dbVacanCollectionName = db.collection("vacancies");
const dbVacanCollectionNameApplied = db.collection("appliedusers");
export const getData = async (type) => {
  const recieveData = await dbCollectionName.where("type", "==", type).get();
  return recieveData.docs;
};
// export const getForBool = (abc) => {
//   // const recieveData = dbVacanCollectionNameApplied.where("Student_Email", "==", email).get();
//   // return recieveData.docs;
//   dbVacanCollectionNameApplied.onSnapshot(function (querySnapshot) {
//     console.log("user new", abc);
//     abc(querySnapshot.docs.map((doc) => (
//       {
//         id: doc.id,
//         email: doc.data().Student_Email
//       }
//     )
//     ));
//   }
//   )
// }

export const getForBool = (cb) => (
  dbVacanCollectionName.onSnapshot(function (querySnapshot) {
    let arr = [];
    querySnapshot.docs.map((doc) => arr.push(doc.data()));
    cb && cb(arr);
  })
);
export const getUserData = (user) => {
  dbCollectionName.onSnapshot(function (querySnapshot) {
    user(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email,
        name: doc.data().name,
        password: doc.data().password,
        type: doc.data().type,
      }))
    );
  });
};
export const getStuVacancies = (vacan) => {
  dbVacanCollectionName.onSnapshot(function (querySnapshot) {
    vacan(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        Company_Name: doc.data().Company_Name,
        Established_Year: doc.data().Established_Year,
        Job_Description: doc.data().Job_Description,
        Job_Timings: doc.data().Job_Timings,
        Position_Name: doc.data().Position_Name
      }))
    );
  });
};
export const getstuID = (userord, password) => {
  dbCollectionName.onSnapshot(function (querySnapshot) {
    userord(
      querySnapshot.docs.map((doc) =>
        doc.data().password === password
          ? {
              id: doc.id,
              email: doc.data().email,
              name: doc.data().name,
              password: doc.data().password,
              type: doc.data().type,
            }
          : null
      )
    );
  });
};

export const deleteUser = (id) => {
  dbCollectionName.doc(id).delete();
};
export const getName = (name) => {
  return name;
};
export const getVacancies = async (namenew) => {
  const recieveDatavac = await dbVacanCollectionName
    .where("Company_Name", "==", namenew)
    .get();
  return recieveDatavac.docs;
};
// export const getStuVacancies = async () => {
//   const recieveDatavac = await dbVacanCollectionName.get();
//   return recieveDatavac.docs;
// };

