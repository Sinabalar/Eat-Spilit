import style from "./index.css"
import FormAddFriend from "./FormAddFriend"
import FriendsList from "./FriendsList"
import Button from "./Button";
import FormSplitBill from "./FormSpilitBill";
import {useState} from "react";
import initialFriends from "./Data";

export default function App2() {
    const [isOpenAddFriend, setIsOpenAddFriend] = useState(false);

    function handelIsOpenAddFriend() {
        setIsOpenAddFriend(() => !isOpenAddFriend);
        setSelectedFriend(null)
    }

    const [selectedFriend, setSelectedFriend] = useState(null);

    function handelSelectedFriend(friend) {
        setIsOpenAddFriend(false)
        setSelectedFriend((curFriend) =>
            curFriend?.id === friend.id
                ? null
                : friend);


    }

    const [listOfFriends, setListOfFriends] = useState(initialFriends);

    function handelListOfFriends(newFriend) {
        setListOfFriends((curFriends) =>
            [...curFriends, newFriend]);
    }

    function handelSplitBill(expenses) {
        setListOfFriends((curList) =>
            curList.map((el) => el.id === selectedFriend.id
                ? {...el, balance: el.balance + expenses}
                : el
            )
        )
    }


    return (
        <div className={'app'}>
            <div className={'sidebar'}>
                <FriendsList
                    handelSelectedFriend={handelSelectedFriend}
                    list={listOfFriends}
                    selectedFriend={selectedFriend}
                />
                {isOpenAddFriend &&
                    (<FormAddFriend
                        onAddFriend={handelListOfFriends}
                        afterAdd={handelIsOpenAddFriend}

                    />)
                }
                <Button onClick={handelIsOpenAddFriend}
                >{isOpenAddFriend ? 'Close' : 'Add friend'}</Button>
            </div>
            {
                selectedFriend &&
                (<FormSplitBill
                    selectedFriend={selectedFriend}
                    onSplitBill={handelSplitBill}
                    afterSplitBill={handelSelectedFriend}

                />)
            }
        </div>
    );
}