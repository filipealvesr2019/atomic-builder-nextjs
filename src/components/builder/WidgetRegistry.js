import { WIDGET_TYPES } from './constants';

import HeadingWidget from './widgets/Heading';
import TextWidget from './widgets/Text';
import ButtonWidget from './widgets/Button';
import ImageWidget from './widgets/Image';

/**
 * Widget Registry
 * Maps the string 'type' from the JSON to the actual React Component.
 */
export const EVENT_WIDGETS = {
  [WIDGET_TYPES.HEADING]: HeadingWidget,
  [WIDGET_TYPES.TEXT]: TextWidget,
  [WIDGET_TYPES.BUTTON]: ButtonWidget,
  [WIDGET_TYPES.IMAGE]: ImageWidget,
  // Add new widgets here
};

export const getWidgetComponent = (type) => {
  return EVENT_WIDGETS[type] || null;
};
