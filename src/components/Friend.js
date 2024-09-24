import Button from "./Button"

export default function Friend({friendItem, onSelect, selectedFriend}) {
    return (
        <li className={friendItem.id === selectedFriend?.id ? 'selected' : null}>
            <img
                src={friendItem.image}
                alt={friendItem.name}
            />
            <h3>{friendItem.name}</h3>

            {
                (friendItem.balance > 0) &&
                <p className={'green'}>{friendItem.name} owe's you {friendItem.balance}</p>
            }
            {
                (friendItem.balance === 0) &&
                <p>You and {friendItem.name} are even</p>
            }
            {
                (friendItem.balance < 0) &&
                <p className={'red'}>You owe {friendItem.name} {Math.abs(friendItem.balance)}</p>
            }

            <Button onClick={() => onSelect(friendItem)}>
                {
                    friendItem.id === selectedFriend?.id
                        ? 'Close'
                        : 'Select'
                }
            </Button>

        </li>
    );
}