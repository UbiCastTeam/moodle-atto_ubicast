<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * ubicast atto plugin version file.
 *
 * @package    atto_ubicast
 * @copyright  2019 UbiCast {@link https://www.ubicast.eu}
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die('Direct access to this script is forbidden.');

/**
 * Initialise the js strings required for this module.
 */
function atto_ubicast_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(
        array(
            'width',
            'height',
            'inputsubmit'
        ),
        'atto_ubicast'
    );
}

/**
 * Sends the parameters to the JS module.
 *
 * @return array
 */
function atto_ubicast_params_for_js() {
    global $PAGE;

    $params = [
        'enabled'   => has_capability('atto/ubicast:use', $PAGE->context),
        'ubicast_url' => trim(get_config('ubicast', 'ubicast_url'), '/'),
        'usefilter' => get_config('atto_ubicast', 'usefilter')
    ];

    return $params;
}

