import $ from 'jquery';

/**
 * Function to execute js script if success Ajax Request
 */
const loadHtmlSuccessCallbacks = [];

export function onLoadHtmlSuccess(callback) {
  if (!loadHtmlSuccessCallbacks.includes(callback)) {
    loadHtmlSuccessCallbacks.push(callback);
  }
}

/**
 * Recursive function to include all elements with attribute wm-include
 */
function loadIncludes(parent) {
  if (!parent) parent = 'body';

  $(parent).find('[wm-include]').each(function(i, e) {
    const url = $(e).attr('wm-include');
    $.ajax({
      url,
      success(data) {
        $(e).html(data);
        $(e).removeAttr('wm-include');

        loadHtmlSuccessCallbacks.forEach(callback => callback(data));
        loadIncludes(e);
      }
    })
  })
}

loadIncludes();
