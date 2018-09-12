import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IShipment, defaultValue } from 'app/shared/model/invoice/shipment.model';

export const ACTION_TYPES = {
  FETCH_SHIPMENT_LIST: 'shipment/FETCH_SHIPMENT_LIST',
  FETCH_SHIPMENT: 'shipment/FETCH_SHIPMENT',
  CREATE_SHIPMENT: 'shipment/CREATE_SHIPMENT',
  UPDATE_SHIPMENT: 'shipment/UPDATE_SHIPMENT',
  DELETE_SHIPMENT: 'shipment/DELETE_SHIPMENT',
  RESET: 'shipment/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IShipment>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ShipmentState = Readonly<typeof initialState>;

// Reducer

export default (state: ShipmentState = initialState, action): ShipmentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SHIPMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SHIPMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SHIPMENT):
    case REQUEST(ACTION_TYPES.UPDATE_SHIPMENT):
    case REQUEST(ACTION_TYPES.DELETE_SHIPMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SHIPMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SHIPMENT):
    case FAILURE(ACTION_TYPES.CREATE_SHIPMENT):
    case FAILURE(ACTION_TYPES.UPDATE_SHIPMENT):
    case FAILURE(ACTION_TYPES.DELETE_SHIPMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHIPMENT_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHIPMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SHIPMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_SHIPMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SHIPMENT):
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

const apiUrl = 'invoice/api/shipments';

// Actions

export const getEntities: ICrudGetAllAction<IShipment> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SHIPMENT_LIST,
    payload: axios.get<IShipment>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IShipment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SHIPMENT,
    payload: axios.get<IShipment>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IShipment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SHIPMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IShipment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SHIPMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IShipment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SHIPMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
