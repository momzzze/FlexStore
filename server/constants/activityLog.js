// Action Types
const ActivityActions = {
  LOGIN: 'login',
  REGISTER: 'register',
  ORDER_CREATED: 'order_created',
  ORDER_CANCELLED: 'order_cancelled',
  PRODUCT_UPDATED: 'product_updated',
};

// Entity Types
const ActivityEntities = {
  LOGIN: 'login',
  USER: 'user',
  ORDER: 'order',
  PRODUCT: 'product',
};

// User Types
const ActivityUserTypes = {
  BO_USER: 'bo_user',
  CLIENT: 'client',
  GUEST: 'guest',
};

module.exports = {
  ActivityActions,
  ActivityEntities,
  ActivityUserTypes,
};
