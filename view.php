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
 * ubicast atto plugin content display view
 *
 * @package    atto_ubicast
 * @copyright  2019 UbiCast {@link https://www.ubicast.eu}
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

global $CFG;
if (!isset($CFG)) {
    require('../../../../../config.php');
}
require_once("$CFG->dirroot/mod/ubicast/locallib.php");
$courseid = required_param('course', PARAM_TEXT);
$videoid = required_param('video', PARAM_TEXT);

$context = context_system::instance();
require_login();
require_capability('mod/ubicast:view', $context);
$PAGE->set_context($context);

$config = get_config('ubicast');
$url = $config->ubicast_url.'/lti/$videoid/';
$course = $DB->get_record('course', array('id' => $courseid), '*', MUST_EXIST);

ubicast_launch_tool($course, null, $videoid);  // Echo inside function.
