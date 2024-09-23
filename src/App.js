import style from "./index.css";
import {useState} from "react";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];


export default function App() {

    const [showAddFriend, setShowAddFriend] = useState(false);

    function handelIsOpenAddForm() {
        setShowAddFriend(showAdd => !showAdd);
        setSelectedFriend(false);
    }

    const [friendList, setFriendsList] = useState(initialFriends)

    function handelAddFriend(newFriend) {
        setFriendsList(() => [...friendList, newFriend]);
        handelIsOpenAddForm()


    }


    const [selectedFriend, setSelectedFriend] = useState(null);

    function handelSelectFriend(friend) {
        setSelectedFriend((cur) =>
            cur?.id === friend.id
                ? null
                : friend
        );
        setShowAddFriend(false);
    }

    function handelSplit(value) {
        setFriendsList((friendList) =>
            friendList.map((el) =>
                el.id === selectedFriend?.id
                    ? {...el, balance: el.balance + value}
                    : el
            ));
        setSelectedFriend(null)

    }


    return (
        <div className='app'>
            <div className='sidebar'>
                <FriendsList
                    friendsList={friendList}
                    handelSelectFriend={handelSelectFriend}
                    selectedFriend={selectedFriend}
                />
                {
                    (showAddFriend) && (<FormAddFriend onAddFriend={handelAddFriend}/>)
                }
                <Button
                    onClick={handelIsOpenAddForm}
                >{!showAddFriend ? 'Add Friend' : 'Close'}
                </Button>
            </div>
            {
                selectedFriend &&
                <FormSplitBill
                    selectedFriend={selectedFriend}
                    onSplit={handelSplit}
                />

            }
        </div>
    );
};

function FriendsList({friendsList, handelSelectFriend, selectedFriend}) {
    return (
        <ul>
            {
                friendsList.map(el =>
                    <Friend
                        friendItem={el}
                        key={el.id}
                        onSelectFriend={handelSelectFriend}
                        selectedFriend={selectedFriend}
                    />)
            }
        </ul>
    )
}

function Friend({friendItem, onSelectFriend, selectedFriend}) {
    const isSelected = selectedFriend?.id === friendItem.id
    return (
        <li className={isSelected ? 'selected' : ''}>
            <img src={friendItem.image} alt={friendItem.name}/>
            <h3>{friendItem.name}</h3>
            {
                (friendItem.balance < 0) &&
                <p className='red'>You owe {friendItem.name} {Math.abs(friendItem.balance)}$</p>

            }
            {
                (friendItem.balance > 0) &&
                <p className='green'>{friendItem.name} owes you {Math.abs(friendItem.balance)}$</p>

            }
            {
                (friendItem.balance === 0) &&
                <p>You and {friendItem.name} are even</p>

            }

            <Button
                onClick={() =>
                    onSelectFriend(friendItem)}
            >{!isSelected ? 'Select' : 'Close'}</Button>

        </li>
    )

}

function FormAddFriend({onAddFriend}) {
    const [name, setName] = useState('');

    // const [image, setImage] = useState('https://ui-avatars.com/api/?name=');

    function handelFriendName(name) {
        setName(name);
    }

    // function handelFriendImage(name) {
    //     setImage('https://ui-avatars.com/api/?name='.concat(name))
    // }

    function handelSubmit(e) {
        e.preventDefault();
        if (!name) return null;

        const newFriend = {
            id: crypto.randomUUID(),
            name,
            image: 'https://ui-avatars.com/api/?name='.concat(name),
            balance: 0
        };

        onAddFriend(newFriend)
        setName('');
        // setImage('https://ui-avatars.com/api/?name=')

    }

    return (
        <form
            className='form-add-friend'
            onSubmit={handelSubmit}
        >
            <label>Friend Name</label>
            <input
                placeholder={'Name'}
                type={'text'}
                value={name}
                onChange={event => {
                    handelFriendName(event.target.value)
                    // handelFriendImage(event.target.value)
                }

                }

            />
            {/*<label>📷 Image URL</label>*/}
            {/*<input*/}
            {/*    placeholder={'URL'}*/}
            {/*    type={'text'}*/}
            {/*    value={image}*/}
            {/*    onChange={event => handelFriendImage(event.target.value)}*/}
            {/*/>*/}
            <Button>Add</Button>
        </form>
    )
}

function FormSplitBill({selectedFriend, onSplit}) {

    const [bill, setBill] = useState('');

    function handelBill(billVal) {
        if (isNaN(billVal)) return null;
        setBill(billVal)
    }

    const [paidByUserVal, setPaidByUserVal] = useState('');

    function handelPaidByUserVal(paidVal) {
        if (isNaN(paidVal)) return null;

        setPaidByUserVal((curVal) =>
            paidVal > bill ? curVal : paidVal)
    }

    const [whoIsPaying, setWhoIsPaying] = useState('user');
    const paidByFriend = bill ? bill - paidByUserVal : ''

    function handelSplitBillForm(e) {
        e.preventDefault();

        if ((!bill) || (!paidByUserVal)) return null;
        onSplit((
            whoIsPaying === 'user'
                ? paidByFriend
                : -paidByUserVal
        ));


    }

    return (
        <form
            className={'form-split-bill'}
            onSubmit={handelSplitBillForm}
        >
            <h2>Split a bill with {selectedFriend.name}</h2>


            <label>💰 Bill value</label>
            <input
                placeholder={'$'}
                type={'text'}
                value={bill}
                onChange={(event) => handelBill(Number(event.target.value))}
            />


            <label>Your expense</label>
            <input
                type={'text'}
                value={paidByUserVal}
                onChange={(event) => handelPaidByUserVal(Number(event.target.value))}
            />


            <label>{selectedFriend.name}'s expense</label>
            <input
                type={'text'}
                disabled
                value={paidByFriend}
            />


            <label>🤔 Who is paying the bill ?</label>
            <select
                value={whoIsPaying}
                onChange={(event => setWhoIsPaying(event.target.value))}
            >
                <option value={'user'}>Me</option>
                <option value={'friend'}>{selectedFriend.name}</option>
            </select>


            <Button>Spilit bill</Button>


        </form>
    )
}

function Button({children, onClick}) {
    return (
        <button onClick={onClick} className={'button'}>{children}</button>
    )
}