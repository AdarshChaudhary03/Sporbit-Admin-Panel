import firebaseConfig from "../configs/firebaseConfig";

export const getUsers = async () => {
  let tempUsers = {};
  const querySnapshot = await firebaseConfig
    .firestore()
    .collection("users")
    .get();

  for await (const docSnapshot of querySnapshot.docs) {
    tempUsers[docSnapshot.id] = {
      ...docSnapshot.data(),
      key: docSnapshot.id,
    };
  }

  return tempUsers;
};

export const getCoupons = async () => {
  let tempCoupons = {};
  const querySnapshot = await firebaseConfig
    .firestore()
    .collection("coupons")
    .get();

  for await (const docSnapshot of querySnapshot.docs) {
    tempCoupons[docSnapshot.id] = {
      ...docSnapshot.data(),
      key: docSnapshot.id,
    };
  }

  return tempCoupons;
};

export const getFacilities = async () => {
  let tempFacilities = {};
  const querySnapshot = await firebaseConfig
    .firestore()
    .collection("facilities")
    .get();

  for await (const docSnapshot of querySnapshot.docs) {
    tempFacilities[docSnapshot.id] = {
      ...docSnapshot.data(),
      key: docSnapshot.id,
    };
  }

  return tempFacilities;
};

export const getBookings = async (selectedFacilityID) => {
  let tempbookings = {};
  const querySnapshot = await firebaseConfig
    .firestore()
    .collection(`facilities/${selectedFacilityID}/bookings`)
    .get();

  for await (const docSnapshot of querySnapshot.docs) {
    tempbookings[docSnapshot.id] = {
      ...docSnapshot.data(),
      key: docSnapshot.id,
    };
  }

  return tempbookings;
};

export const getAcademies = async () => {
  let tempAcademies = {};
  const querySnapshot = await firebaseConfig
    .firestore()
    .collection("academies")
    .get();

  for await (const docSnapshot of querySnapshot.docs) {
    tempAcademies[docSnapshot.id] = {
      ...docSnapshot.data(),
      key: docSnapshot.id,
    };
  }

  return tempAcademies;
};

export const getSports = async () => {
  let tempSports = {};
  const querySnapshot = await firebaseConfig
    .firestore()
    .collection("sports")
    .get();

  for await (const docSnapshot of querySnapshot.docs) {
    tempSports[docSnapshot.id] = {
      ...docSnapshot.data(),
      key: docSnapshot.id,
    };
  }

  return tempSports;
};

export const getSportsByAcademy = async (academyId) => {
  let tempSports = {};
  const querySnapshot = null;
  const academies = await firebaseConfig
  .firestore()
  .collection('academies')
  .where('sports','array-contains',academyId)
  .get()
  .then((docRef) => {
    querySnapshot = firebaseConfig.firestore().collection('sports').doc(docRef.id).get();
  });

  for await (const docSnapshot of querySnapshot.docs) {
    tempSports[docSnapshot.id] = {
      ...docSnapshot.data(),
      key: docSnapshot.id,
    };
  }

  return tempSports;
};

export const getStudents = async (selectedAcademyID) => {
  let tempStudents = {};
  const querySnapshot = await firebaseConfig
    .firestore()
    .collection(`academies/${selectedAcademyID}/students`)
    .get();

  for await (const docSnapshot of querySnapshot.docs) {
    if(docSnapshot.data().status!=='Registered'){
      const playerData = await docSnapshot.data().player.get();
      tempStudents[docSnapshot.id] = {
        ...docSnapshot.data(),
        ...playerData.data(),
        key: docSnapshot.id,
      };  
    }
  }
  return tempStudents;
};


export const getBatches = async (selectedAcademyID) => {
  console.log(selectedAcademyID);
  let tempBatches = {};
  const querySnapshot = await firebaseConfig
    .firestore()
    .collection(`academies/${selectedAcademyID}/batches`)
    .get();

  for await (const docSnapshot of querySnapshot.docs) {
    tempBatches[docSnapshot.id] = {
      ...docSnapshot.data(),
      key: docSnapshot.id,
    };
  }
  console.log(tempBatches);
  return tempBatches;
};

export const getCoaches = async (selectedAcademyID,selectedSportID) => {
  let tempCoaches = {};
  console.log('SelectedSportID: ' + selectedSportID);
  console.log('SelectedAcademyID: ' + selectedAcademyID);
  let querySnapshot = selectedSportID ? (await firebaseConfig
    .firestore()
    .collection(`coaches`)
    .where('sports','==',selectedSportID)
    .get()) : 
    (await firebaseConfig
      .firestore()
      .collection(`coaches`)
      .get());
    ;
    if(selectedSportID==''){
      console.log('Gottcha');
      querySnapshot = await firebaseConfig
      .firestore()
      .collection(`coaches`)
      .get();  
    }
    console.log("SelectedAcademyID: "+selectedAcademyID);
    console.log("SelectedSportID: "+selectedSportID);
  for await (const documentSnapshot of querySnapshot.docs) {
    console.log(documentSnapshot.data().academy.id);
    if(selectedAcademyID==''){
      tempCoaches[documentSnapshot.id] = {
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      };
    }
    else if (selectedAcademyID!='' && documentSnapshot.data().academy.id === selectedAcademyID) {
      tempCoaches[documentSnapshot.id] = {
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      };
    }
  }
  console.log(tempCoaches);
  return tempCoaches;
};

export const getSocities = async () => {
  let tempSocieties = {};
  const querySnapshot = await firebaseConfig
    .firestore()
    .collection(`societies`)
    .get();
  for await (const documentSnapshot of querySnapshot.docs) {
    tempSocieties[documentSnapshot.id] = {
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    };
  }
  console.log(tempSocieties);
  return tempSocieties;
};

export const getResidents = async (selectedSocietyID) => {
  let tempResidents = {};
  const querySnapshot = await firebaseConfig
    .firestore()
    .collection(`societies/${selectedSocietyID}/residents`)
    .get();
  for await (const documentSnapshot of querySnapshot.docs) {
    tempResidents[documentSnapshot.id] = {
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    };
  }
  console.log(tempResidents);
  return tempResidents;
};
