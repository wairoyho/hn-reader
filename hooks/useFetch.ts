import { useEffect, useReducer } from "react";

interface FetchDataState {
  loading: boolean;
  data: any;
  error: any;
}
interface FetchDataAction {
  type:
    | "FETCH_DATA"
    | "FETCH_DATA_SUCCESS"
    | "FETCH_DATA_FAILURE"
    | "RESET_DATA";
  data?: any;
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const reducer = (state: FetchDataState, action: FetchDataAction) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
        error: null,
      };
    case "FETCH_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        data: null,
        error: action.data,
      };
    case "RESET_DATA":
      return {
        loading: false,
        data: null,
        error: null,
      };
    default:
      return state;
  }
};

interface useFetchArgsOptions {
  loadOnMount?: boolean;
  clearDataOnLoad?: boolean;
}

const useFetch = (
  fetchFn: (...args: any[]) => Promise<Response>,
  { loadOnMount = false, clearDataOnLoad = false }: useFetchArgsOptions = {}
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadData = async (...args: any[]) => {
    if (clearDataOnLoad === true) dispatch({ type: "RESET_DATA" });

    dispatch({ type: "FETCH_DATA" });
    fetchFn(...args)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({ type: "FETCH_DATA_SUCCESS", data });
      })
      .catch((e) => {
        console.error("useFetch: ", e);
        dispatch({
          type: "FETCH_DATA_FAILURE",
          data: { message: JSON.stringify(e) },
        });
      });
  };

  useEffect(() => {
    if (loadOnMount) {
      loadData();
    }
  }, []);

  return {
    data: state.data,
    isLoading: state.loading,
    error: state.error,
    loadData,
  };
};

export default useFetch;
