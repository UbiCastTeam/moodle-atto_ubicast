<?php
/**
 * URL configuration form
 *
 * @package    mod
 * @subpackage ubicast
 * @copyright  2013 UbiCast {@link https://www.ubicast.eu}
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

if (!defined('MOODLE_INTERNAL')) { die('Direct access to this script is forbidden.'); }

require_once('c.php');
require_once($CFG->libdir . '/formslib.php');

class mod_ubicast_mod_form extends moodleform {
    function definition() {
        global $CFG, $DB, $COURSE, $EC_WWW, $LC_WWW;
        $mform = $this->_form;
        $mform->setAttributes(['id'=>'atto_ubicast_form']);
        $mform->setAttributes(['class'=>'mform']);
        $mform->addElement('header', 'fieldset_ubicast', '');
        $mform->setExpanded('fieldset_ubicast');

        $mform->addElement('text', 'mediaid', get_string('form_resource', 'ubicast'), ['size' => '20']);
        $mform->addHelpButton('mediaid', 'form_resource', 'ubicast');
        $mform->setType('mediaid', PARAM_TEXT);

        $config = get_config('ubicast');
        $tool_base_URL = $config->ubicast_url;

        $button = html_writer::tag('button', get_string('form_resource_pick', 'ubicast'),
            ['type' => 'button', 'onclick' => 'javascript: media_selector.open();']);
        $ifr =  html_writer::tag('iframe', null, ['src' => "$EC_WWW/statics/media.png", 'frameborder' => '0']);
        $fitem = html_writer::div(html_writer::div(
            html_writer::div($button.$ifr,null, ['id' => 'mod_ms_browser_preview']),
            'felement'), 'fitem', ['id' => 'atto_ubicast_fitem']);

        $mform->addElement('html', $fitem);

        $mform->addElement('text', 'media_width', get_string('width', 'atto_ubicast'), ['size' => '20', 'value' => '100%']);
        $mform->addElement('text', 'media_height', get_string('height', 'atto_ubicast'), ['size' => '20', 'value' => '300px']);

        $mform->addElement('hidden', 'ms_mediaserverURL', $tool_base_URL);
        foreach (['ms_mediaserverURL', 'media_width', 'media_height'] as $name){
            $mform->setType($name, PARAM_TEXT);
            $elem =& $mform->getElement($name);
            $elem->_attributes['id'] = $name;
        }
    }
}
