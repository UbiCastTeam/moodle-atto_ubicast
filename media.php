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
 * ubicast atto plugin media form view
 *
 * @package    atto_ubicast
 * @copyright  2019 UbiCast {@link https://www.ubicast.eu}
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

global $CFG;
if (!isset($CFG)) {
    require('../../../../../config.php');
}
require_once("$CFG->dirroot/lib/editor/atto/plugins/ubicast/mod_form.php");

$context = context_system::instance();
require_login();
require_capability('mod/ubicast:view', $context);
$PAGE->set_context($context);
$url = new moodle_url("$CFG->dirroot/lib/editor/atto/plugins/ubicast/media.php");
$PAGE->set_url($url);

$mform = new mod_ubicast_mod_form();
$mform->display();
