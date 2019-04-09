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
 * ubicast atto plugin form
 *
 * @package    atto_ubicast
 * @copyright  2019 UbiCast {@link https://www.ubicast.eu}
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir.'/formslib.php');

class mod_ubicast_mod_form extends moodleform {
    public function definition() {
        global $CFG, $DB, $COURSE;
        $mform = $this->_form;
        $mform->setAttributes(['class' => 'mform atto-ubicast-form']);

        $mform->addElement('html', '
            <div class="fitem">
                <div class="felement" style="margin: 0;">
                    <iframe class="atto-ubicast" style="margin: 0; width: 100%; height: 400px;" src="" frameborder="0"></iframe>
                </div>
            </div>');

        $mform->addElement('text', 'mediaid', get_string('form_resource', 'ubicast'), ['size' => '20', 'class' => 'atto-ubicast']);
        $mform->addHelpButton('mediaid', 'form_resource', 'ubicast');
        $mform->setType('mediaid', PARAM_TEXT);

        $mform->addElement('text', 'media_width', get_string('width', 'atto_ubicast'), ['size' => '20', 'value' => '100%']);
        $mform->addElement('text', 'media_height', get_string('height', 'atto_ubicast'), ['size' => '20', 'value' => '300px']);

        $config = get_config('ubicast');
        $mform->addElement('hidden', 'ms_mediaserverURL', $config->ubicast_url);
        foreach (['ms_mediaserverURL', 'media_width', 'media_height'] as $name) {
            $mform->setType($name, PARAM_TEXT);
            $elem =& $mform->getElement($name);
            $elem->_attributes['id'] = $name;
        }
    }
}
