# Documentation on using action types

## Previously we used strings for action types (Do not do this)

```javascript
const dispatch = useDispatch();

const user = useSelector((store) => store.user);

useEffect(() => {
  🚫 dispatch({ type: 'FETCH_USER' }); 🚫 // DO NOT DO THIS
}, [dispatch]);
```

- Why ?
- Strings are prone to typos. `dispatch({ type: 'FET_USER' })` would not give you an error, it would fire and nothing would happen
  aka fail silently

## Use action types from objects defined in the `/redux/actions/` folder.

```javascript
import { USER_SAGA_ACTIONS } from '../../redux/actions/user.saga.actions'; // ✅ import the action types for the saga or reducer

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: USER_SAGA_ACTIONS.FETCH_USER }); // ✅ access the action through the object
  }, [dispatch]);
	return (
		...
	);
}
```

### Each Reducer and Saga has a action types file that contains the actions object for that reducer/saga.

- Why do this?
- Your editor will tell you if there is a typo when you try to access keys from a known object
- Less bugs 🎉
- Auto complete in code editor
