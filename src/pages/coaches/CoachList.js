import React, { useState, useEffect } from 'react';
import firebase from '../util/firebase';
import Todo from './Todo';

export default function CoachList() {
  const [coachList, setCoachList] = useState();

  useEffect(() => {
    const coachRef = firebase.database().ref('coaches');
    coachRef.on('value', (snapshot) => {
      const coaches = snapshot.val();
      const coachList = [];
      for (let id in coaches) {
        coachList.push({ id, ...coaches[id] });
      }
      setCoachList(coachList);
    });
  }, []);

  return (
    <div>
      {coachList
        ? coachList.map((coach, index) => <Coach coach={coach} key={index} />)
        : ''}
    </div>
  );
}