import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInvoice, defaultValue } from 'app/shared/model/invoice/invoice.model';

export const ACTION_TYPES = {
  FETCH_INVOICE_LIST: 'invoice/FETCH_INVOICE_LIST',
  FETCH_INVOICE: 'invoice/FETCH_INVOICE',
  CREATE_INVOICE: 'invoice/CREATE_INVOICE',
  UPDATE_INVOICE: 'invoice/UPDATE_INVOICE',
  DELETE_INVOICE: 'invoice/DELETE_INVOICE',
  RESET: 'invoice/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInvoice>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type InvoiceState = Readonly<typeof initialState>;

// Reducer

export default (state: InvoiceState = initialState, action): InvoiceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INVOICE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INVOICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INVOICE):
    case REQUEST(ACTION_TYPES.UPDATE_INVOICE):
    case REQUEST(ACTION_TYPES.DELETE_INVOICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INVOICE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INVOICE):
    case FAILURE(ACTION_TYPES.CREATE_INVOICE):
    case FAILURE(ACTION_TYPES.UPDATE_INVOICE):
    case FAILURE(ACTION_TYPES.DELETE_INVOICE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVOICE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVOICE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INVOICE):
    case SUCCESS(ACTION_TYPES.UPDATE_INVOICE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INVOICE):
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

const apiUrl = 'invoice/api/invoices';

// Actions

export const getEntities: ICrudGetAllAction<IInvoice> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_INVOICE_LIST,
    payload: axios.get<IInvoice>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IInvoice> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INVOICE,
    payload: axios.get<IInvoice>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IInvoice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INVOICE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInvoice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INVOICE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInvoice> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INVOICE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
