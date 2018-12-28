<?php

/**
 * Atto text editor integration version file.
 *
 * @package    atto_easycastms
 * @copyright  2018 UbiCast {@link http://ubicast.eu}
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Initialise the js strings required for this module.
 */
function atto_easycastms_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(
        array(
            'pluginname',
            'select',
            'record',
            'upload',
            'inputlabel',
            'inputplaceholder',
            'inputsubmit',
        ),
        'atto_easycastms'
    );
}

// /**
//  * Return the js params required for this module.
//  * @return array of additional params to pass to javascript init function for this module.
//  */
// function atto_easycastms_params_for_js() {
//     return array('bestodds' => '34 to 1', 'worstodds' => '5 to 1');
// }
