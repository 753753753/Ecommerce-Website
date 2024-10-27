import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fireDB } from '../firebase/FirebaseConfig';
const MyContext = createContext();

export const MyContextDataProvider = ({ children }) => {
  const [loading, setloading] = useState(false)
  
  // get Product
  const [getproduct, setgetproduct] = useState([])

  const getAllProduct = async () => {
    setloading(true)

    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setgetproduct(productArray);
        setloading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }

  // get Order

  const [getorder, setgetorder] = useState([])

  const getallorder = async () => {
    setloading(true)
    try {
      const q = query(
        collection(fireDB, "order"),
        orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray = [];
        QuerySnapshot.forEach((doc) => {
          orderArray.push({ ...doc.data(), id: doc.id });
        });
        setgetorder(orderArray);
        setloading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }

  const deleteorder = async (id) => {
        setloading(true);

        try{
            await deleteDoc(doc(fireDB , 'order' , id))
            toast.success('Order Deleted successfully')
            getallorder();
            setloading(false)
        }
        catch (error) {
          console.log(error)
          setloading(false)
      }
  }

  // get user

  const [getuser, setgetuser] = useState([])
 
  const getalluser = async () => {
      setloading(true)
    
      try {
        const q = query(
          collection(fireDB, "user"),
          orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
          let userArray = [];
          QuerySnapshot.forEach((doc) => {
              userArray.push({ ...doc.data(), id: doc.id });
          });
          setgetuser(userArray);
          setloading(false);
      });
      return () => data;
      } catch (error) {
         console.log(error)
         setloading(false)
      }
  }
   


  useEffect(() => {
    getAllProduct();
    getallorder();
    getalluser();
  }, [])

  return (
    <MyContext.Provider value={{ loading, setloading , getAllProduct , getproduct , setgetproduct , getorder , setgetorder , getallorder , deleteorder , getuser , setgetuser , getalluser}}>
      {children}
    </MyContext.Provider>
  );

};

export const useData = () => {
  return useContext(MyContext);
};
