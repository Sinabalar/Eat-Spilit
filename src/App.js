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
        setShowAddFriend(showAdd=>!showAdd)
    }


    return (
        <div className='app'>
            <div className='sidebar'>
                <FriendsList/>
                {
                    (showAddFriend) && (<FormAddFriend/>)
                }
                <Button
                    onClick={handelIsOpenAddForm}
                >{!showAddFriend ? 'Add Friend':'Close'}
                </Button>
            </div>
            <FormSpilitBill/>
        </div>
    );
};

function FriendsList() {
    const friends = initialFriends;
    return (
        <ul>
            {
                friends.map(el => <Friend friendItem={el} key={el.id}/>)
            }
        </ul>
    )
}

function Friend({friendItem}) {
    return (
        <li>
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

            <Button>Select</Button>

        </li>
    )
}

function FormAddFriend() {
    return (
        <form className='form-add-friend'>
            <label>Friend Name</label>
            <input placeholder={'Name'} type={'text'}/>
            <label>📷 Image URL</label>
            <input placeholder={'URL'} type={'text'}/>
            <Button>Add</Button>
        </form>
    )
}

function Button({children,onClick}) {
    return (
        <button onClick={onClick} className={'button'}>{children}</button>
    )
}

function FormSpilitBill() {
    return (
        <form className={'form-split-bill'}>
            <h2>Split a bill with X</h2>
            <label>💰 Bill value</label>
            <input placeholder={'$'} type={'text'}/>
            <label>Your expense</label>
            <input type={'text'}/>
            <label>X's expense</label>
            <input type={'text'} disabled/>
            <label>🤔 Who is paying the bill ?</label>
            <select>
                <option value={'user'}>Me</option>
                <option value={'friend'}>X</option>
            </select>
            <Button>Spilit bill</Button>


        </form>
    )
}