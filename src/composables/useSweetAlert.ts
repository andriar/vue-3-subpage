import Swal, { type SweetAlertOptions, type SweetAlertResult } from 'sweetalert2';

interface AlertParams {
  text: string;
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  customClass?: SweetAlertOptions['customClass'];
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
}

// Centralized default custom classes for better organization
const DEFAULT_POPUP_CLASSES: SweetAlertOptions['customClass'] = {
  popup: 'default-popup',
  title: 'default-title',
  htmlContainer: 'default-html-container',
  confirmButton: 'default-confirm-button',
  cancelButton: 'default-cancel-button',
  actions: 'default-actions',
  icon: 'default-icon',
};

// SVG icons as constants for reusability and clarity
const SUCCESS_ICON_SVG = `<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.72727 26C4.72727 14.2514 14.2514 4.72727 26 4.72727C37.7486 4.72727 47.2727 14.2514 47.2727 26C47.2727 37.7486 37.7486 47.2727 26 47.2727C14.2514 47.2727 4.72727 37.7486 4.72727 26ZM26 0C11.6406 0 0 11.6406 0 26C0 40.3594 11.6406 52 26 52C40.3594 52 52 40.3594 52 26C52 11.6406 40.3594 0 26 0ZM37.1969 20.5063C38.079 19.544 38.014 18.0488 37.0517 17.1667C36.0894 16.2846 34.5943 16.3496 33.7122 17.3119L22.4545 29.593L18.2878 25.0475C17.4057 24.0852 15.9106 24.0202 14.9483 24.9023C13.986 25.7844 13.921 27.2795 14.8031 28.2418L20.7122 34.6881C21.1599 35.1765 21.792 35.4545 22.4545 35.4545C23.1171 35.4545 23.7492 35.1765 24.1969 34.6881L37.1969 20.5063Z" fill="#27B199"/>
</svg>`;

const ERROR_ICON_SVG = `<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M26 4.72727C14.2514 4.72727 4.72727 14.2514 4.72727 26C4.72727 37.7486 14.2514 47.2727 26 47.2727C37.7486 47.2727 47.2727 37.7486 47.2727 26C47.2727 14.2514 37.7486 4.72727 26 4.72727ZM0 26C0 11.6406 11.6406 0 26 0C40.3594 0 52 11.6406 52 26C52 40.3594 40.3594 52 26 52C11.6406 52 0 40.3594 0 26ZM34.7622 17.2377C35.6853 18.1608 35.6853 19.6574 34.7622 20.5804L29.3427 26L34.7622 31.4196C35.6853 32.3426 35.6853 33.8392 34.7622 34.7622C33.8392 35.6853 32.3426 35.6853 31.4196 34.7622L26 29.3427L20.5804 34.7622C19.6574 35.6853 18.1608 35.6853 17.2377 34.7622C16.3147 33.8392 16.3147 32.3426 17.2377 31.4196L22.6573 26L17.2377 20.5804C16.3147 19.6574 16.3147 18.1608 17.2377 17.2377C18.1608 16.3147 19.6574 16.3147 20.5804 17.2377L26 22.6573L31.4196 17.2377C32.3426 16.3147 33.8392 16.3147 34.7622 17.2377Z" fill="#EB5757"/>
</svg>`;

const WARNING_ICON_SVG = `<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M26 4.72727C14.2514 4.72727 4.72727 14.2514 4.72727 26C4.72727 37.7486 14.2514 47.2727 26 47.2727C37.7486 47.2727 47.2727 37.7486 47.2727 26C47.2727 14.2514 37.7486 4.72727 26 4.72727ZM0 26C0 11.6406 11.6406 0 26 0C40.3594 0 52 11.6406 52 26C52 40.3594 40.3594 52 26 52C11.6406 52 0 40.3594 0 26ZM26 14.1818C27.3054 14.1818 28.3636 15.2401 28.3636 16.5455V26C28.3636 27.3054 27.3054 28.3636 26 28.3636C24.6946 28.3636 23.6364 27.3054 23.6364 26V16.5455C23.6364 15.2401 24.6946 14.1818 26 14.1818ZM26 33.0909C24.6946 33.0909 23.6364 34.1491 23.6364 35.4545C23.6364 36.7599 24.6946 37.8182 26 37.8182H26.0236C27.329 37.8182 28.3873 36.7599 28.3873 35.4545C28.3873 34.1491 27.329 33.0909 26.0236 33.0909H26Z" fill="#D78E08"/>
</svg>`;

export const useSweetAlert = () => {
  /**
   * Internal function to display a SweetAlert.
   * @param options - SweetAlertOptions to configure the alert.
   * @returns A Promise that resolves with the SweetAlertResult.
   */
  const _showSwal = (options: SweetAlertOptions): Promise<SweetAlertResult> => {
    return Swal.fire(options);
  };

  /**
   * Builds SweetAlertOptions based on the alert type and provided parameters.
   * @param type - The type of SweetAlert icon ('success', 'error', 'warning', 'info', 'question').
   * @param params - Parameters for the alert content and behavior.
   * @param customClasses - Optional custom classes to merge with defaults.
   * @returns SweetAlertOptions for Swal.fire().
   */
  const _buildAlertOptions = (
    type: SweetAlertOptions['icon'],
    {
      text,
      title,
      confirmButtonText,
      cancelButtonText,
      showCancelButton = true,
      allowOutsideClick,
      allowEscapeKey,
    }: AlertParams,
    customClasses: SweetAlertOptions['customClass'] = DEFAULT_POPUP_CLASSES // Default to common classes
  ): SweetAlertOptions => {
    let iconHtml = '';

    // Using a switch statement for cleaner icon assignment
    switch (type) {
      case 'success':
        iconHtml = SUCCESS_ICON_SVG;
        break;
      case 'error':
        iconHtml = ERROR_ICON_SVG;
        break;
      case 'warning':
        iconHtml = WARNING_ICON_SVG;
        break;
      // No custom SVG for 'info' or 'question', SweetAlert2 provides defaults
      case 'info':
      case 'question':
      default:
        // If no custom SVG for the type, SweetAlert2 will use its default icon.
        // Or you could set a default custom SVG if you always want one.
        break;
    }

    return {
      icon: type, // Let SweetAlert2 handle the icon type for 'info', 'question'
      iconHtml: iconHtml || undefined, // Only set if a custom SVG is provided
      title: title || '',
      html: text || '',
      confirmButtonText: confirmButtonText || 'OK',
      cancelButtonText: cancelButtonText || 'Cancel',
      showCancelButton: showCancelButton,
      customClass: customClasses, // Apply the determined custom classes
      allowOutsideClick: allowOutsideClick ?? true,
      allowEscapeKey: allowEscapeKey ?? true,
    };
  };

  /**
   * Helper function to create a typed alert.
   * @param type - The SweetAlert icon type.
   * @param params - Alert parameters.
   * @param specificCustomClasses - Custom classes specific to this alert type.
   * @returns A Promise that resolves with the SweetAlertResult.
   */
  const createTypedAlert = (
    type: SweetAlertOptions['icon'],
    params: AlertParams,
    specificCustomClasses: SweetAlertOptions['customClass']
  ): Promise<SweetAlertResult> => {
    const mergedCustomClasses = {
      ...DEFAULT_POPUP_CLASSES, // Always include the base classes
      ...specificCustomClasses, // Apply specific classes for the type
      ...params.customClass, // User-provided custom classes take highest precedence
    };
    const options = _buildAlertOptions(type, params, mergedCustomClasses);
    return _showSwal(options);
  };

  return {
    /**
     * Directly shows a SweetAlert with full options.
     * @param options - SweetAlertOptions.
     * @returns A Promise that resolves with the SweetAlertResult.
     */
    showSwal: _showSwal,

    showAlert: {
      /**
       * Displays a warning alert.
       * @param params - AlertParams for the warning alert.
       * @returns A Promise that resolves with the SweetAlertResult.
       */
      warning: (params: AlertParams): Promise<SweetAlertResult> =>
        createTypedAlert('warning', params, DEFAULT_POPUP_CLASSES),

      /**
       * Displays an error alert.
       * @param params - AlertParams for the error alert.
       * @returns A Promise that resolves with the SweetAlertResult.
       */
      error: (params: AlertParams): Promise<SweetAlertResult> =>
        createTypedAlert('error', params, DEFAULT_POPUP_CLASSES), // Error can use default if no specific needed

      /**
       * Displays a success alert.
       * @param params - AlertParams for the success alert.
       * @returns A Promise that resolves with the SweetAlertResult.
       */
      success: (params: AlertParams): Promise<SweetAlertResult> =>
        createTypedAlert('success', params, DEFAULT_POPUP_CLASSES), // Success can use default if no specific needed
    },
  };
};
