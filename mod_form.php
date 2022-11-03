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

        $mform->addElement('header', 'resource_atto_ubicast', get_string('form_resource_header', 'ubicast'));
        $mform->addElement('html', '
            <div class="fitem">
                <div class="felement" style="margin: 0;">
                    <iframe class="ubicast-iframe" style="margin: 0; width: 100%; height: 230px;" src="" frameborder="0"></iframe>
                </div>
            </div>');

        $mform->addElement('text', 'mediaid', get_string('form_resource', 'ubicast'),
            ['size' => '20', 'onchange' => "javascript: this.value = ((new RegExp('(?:^|/)([cvlp][a-z0-9]{19})($:^|/)').exec(this.value)) || [null, this.value])[1]"]);
        $mform->addHelpButton('mediaid', 'form_resource', 'ubicast');
        $mform->setType('mediaid', PARAM_TEXT);

        $elem =& $mform->addElement('hidden', 'mediaimg', 'mediaimg',
            ['size' => '100']);
        $elem->_attributes['id'] = 'id_mediaimg';
        $mform->setType('mediaimg', PARAM_PATH);

        $mform->addElement('text', 'mediawidth', get_string('width', 'atto_ubicast'),
            ['size' => '20', 'value' => '100%']);
        $mform->setType('mediawidth', PARAM_TEXT);

        $mform->addElement('text', 'mediaheight', get_string('height', 'atto_ubicast'),
            ['size' => '20', 'value' => '300px']);
        $mform->setType('mediaheight', PARAM_TEXT);
    }
}
