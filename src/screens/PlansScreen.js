import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, addDoc, onSnapshot } from "firebase/firestore";
import "./PlansScreen.css"
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from "@stripe/stripe-js";

const PlansScreen = () => {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        const docRef = doc(db, 'customers', user.uid);
        const docColl = collection(docRef, 'subscriptions')
        getDocs(docColl).then((querySnaphot) => {
            querySnaphot.forEach(async subscription => {
                try {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds
                    })
                } catch (err) {
                    console.log(err);
                }
            })
        })
    }, [user.uid]);

    useEffect(() => {
        async function fetchProducts() {
            const q = query(collection(db, "products"), where("active", "==", true));
            const querySnapshot = await getDocs(q);
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products);
        }
        fetchProducts();
    }, [])
    // console.log(products);
    const loadCheckout = async (priceId) => {
        try {
            const docRef = doc(db, 'customers', user.uid)
            const newColl = collection(docRef, 'checkout_sessions')
            const final = await addDoc(newColl, {
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            })
            onSnapshot(final, async (snap) => {
                const { error, sessionId } = snap.data()
                if (error) {
                    alert(`An error occured : ${error.message}`);
                }
                if (sessionId) {
                    const stripe = await loadStripe("pk_test_51LVAUMSE8lSlpiMPB6nQxAWbkAP5KHFRvbPPbbGJCyDyn9namt1lKzZ1cdXMQGjDGGrT6sdYCxLNRsMSddW7Ydd800sP5BbX5A");
                    stripe.redirectToCheckout({ sessionId })
                };
            });

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='plansScreen'>
            {subscription && <p>Renewal Date : {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {
                const iscurrentPlan = productData.name?.toLowerCase().includes(subscription?.role)
                console.log(subscription?.role);
                console.log(productData.name);
                return (
                    <div className={`${iscurrentPlan && "plansScreen__plan--disabled"} plansScreen__plan`} key={productId} >
                        <div className="plansScreen__info">
                            <h2>{productData.name}</h2>
                            <h3>{productData.description}</h3>
                        </div>
                        <button onClick={() => !iscurrentPlan && loadCheckout(productData.prices.priceId)}>
                            {iscurrentPlan ? 'Current Plan' : 'Subscribe'}
                        </button>
                    </div>



                );
            })}
        </div>
    )
}

export default PlansScreen