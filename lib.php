<?php

/**
 * Atto text editor integration version file.
 *
 * @package    atto_easycastms
 * @copyright  2019 UbiCast {@link https://www.ubicast.eu}
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die('Direct access to this script is forbidden.');

/**
 * Initialise the js strings required for this module.
 */
function atto_easycastms_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(
        array(
            'width',
            'height',
            'inputsubmit'
        ),
        'atto_easycastms'
    );

    $PAGE->requires->strings_for_js(
        array(
            'form_resource_pick'
        ),
        'mod_easycastms'
    );
}
