import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOrderItem, defaultValue } from 'app/shared/model/order-item.model';

export const ACTION_TYPES = {
  FETCH_ORDERITEM_LIST: 'orderItem/FETCH_ORDERITEM_LIST',
  FETCH_ORDERITEM: 'orderItem/FETCH_ORDERITEM',
  CREATE_ORDERITEM: 'orderItem/CREATE_ORDERITEM',
  UPDATE_ORDERITEM: 'orderItem/UPDATE_ORDERITEM',
  DELETE_ORDERITEM: 'orderItem/DELETE_ORDERITEM',
  RESET: 'orderItem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOrderItem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type OrderItemState = Readonly<typeof initialState>;

// Reducer

export default (state: OrderItemState = initialState, action): OrderItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ORDERITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ORDERITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ORDERITEM):
    case REQUEST(ACTION_TYPES.UPDATE_ORDERITEM):
    case REQUEST(ACTION_TYPES.DELETE_ORDERITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ORDERITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ORDERITEM):
    case FAILURE(ACTION_TYPES.CREATE_ORDERITEM):
    case FAILURE(ACTION_TYPES.UPDATE_ORDERITEM):
    case FAILURE(ACTION_TYPES.DELETE_ORDERITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ORDERITEM_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ORDERITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ORDERITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_ORDERITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ORDERITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/order-items';

// Actions

export const getEntities: ICrudGetAllAction<IOrderItem> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ORDERITEM_LIST,
    payload: axios.get<IOrderItem>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IOrderItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ORDERITEM,
    payload: axios.get<IOrderItem>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IOrderItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ORDERITEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOrderItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ORDERITEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOrderItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ORDERITEM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
