import Button from "./Button";
import {useState} from "react";

export default function FormAddFriend({onAddFriend, afterAdd}) {
    const [name, setName] = useState('');

    function handelName(name) {
        setName(name)
    }

    function handelAddFriend(e) {
        e.preventDefault();
        if (!name) return null;
        const newFriend = {
            id: crypto.randomUUID(),
            name:name[0].toUpperCase().concat(name.slice(1)),
            image: 'https://ui-avatars.com/api/?name='.concat(name),
            balance: 0
        };
        onAddFriend(newFriend);
        afterAdd();
    }

    return (
        <form
            className={'form-add-friend'}
            onSubmit={handelAddFriend}
        >
            <label>Friend Name</label>
            <input
                value={name}
                onChange={(event) => handelName(event.target.value)}
            />
            <Button>Add</Button>

        </form>
    );

}