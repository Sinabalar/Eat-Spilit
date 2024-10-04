import Button from "./Button";
import {useState} from "react";

export default function FormSplitBill({selectedFriend, onSplitBill, afterSplitBill}) {

    const [bill, setBill] = useState('');

    function handelBill(bilVal) {
        if (isNaN(bilVal)) return null;
        setBill(() => bilVal);
    }

    const [userPaid, setUserPaid] = useState('');

    function handelUserPaid(paidVal) {
        if (isNaN(paidVal) || paidVal > bill) return null;
        setUserPaid(() => paidVal);
    }

    const [whoPaid, setWhoPaid] = useState('user');

    function handelWhoPaid(whoPaid) {
        setWhoPaid(() => whoPaid);
    }

    const friendExpenses = bill - userPaid;

    function handelSubmit(e) {
        e.preventDefault();
        if (!bill || !userPaid) return null;
        const changedBalance = whoPaid === 'user'
            ? friendExpenses
            : -userPaid;
        onSplitBill(changedBalance)
        afterSplitBill(selectedFriend);
    }

    return (
        <form
            className={'form-split-bill'}
            onSubmit={handelSubmit}
        >
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>💰 Bill value</label>
            <input
                value={bill}
                onChange={(event) =>
                    handelBill(Number(event.target.value))
                }

            />
            <label>Your expense</label>
            <input
                value={userPaid}
                onChange={(event) =>
                    handelUserPaid(Number(event.target.value))
                }
            />

            <label>{selectedFriend.name}'s expenses</label>
            <input
                disabled
                value={friendExpenses}
            />

            <label>Who is paying the bill ?</label>
            <select
                value={whoPaid}
                onChange={(event) =>
                    handelWhoPaid(event.target.value)
                }
            >
                <option value={'user'}>You</option>
                <option value={'friend'}>{selectedFriend.name}</option>
            </select>

            <Button>Spilit bill</Button>


        </form>
    );

}