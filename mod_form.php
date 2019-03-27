<?php
/**
 * URL configuration form
 *
 * @package    mod
 * @subpackage easycastms
 * @copyright  2013 UbiCast {@link https://www.ubicast.eu}
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

if (!defined('MOODLE_INTERNAL')) { die('Direct access to this script is forbidden.'); }

require_once('c.php');
require_once($CFG->libdir . '/formslib.php');

class mod_easycastms_mod_form extends moodleform {
    function definition() {
        global $CFG, $DB, $COURSE, $EC_WWW, $LC_WWW;
        $mform = $this->_form;
        $mform->setAttributes(['id'=>'atto_easycastms_form']);
        $mform->addElement('header', 'fieldset_easycastms', '');
        $mform->setExpanded('fieldset_easycastms');
        $mform->addElement('text', 'mediaid', get_string('form_resource', 'easycastms'), array('size'=>'20'));
        $mform->addHelpButton('mediaid', 'form_resource', 'easycastms');
        $mform->setType('mediaid', PARAM_TEXT);

        $config = get_config('easycastms');
        $tool_base_URL = $config->easycastms_url;

        $button = html_writer::tag('button', get_string('form_resource_pick', 'easycastms'),
            ['type' => 'button', 'onclick' => 'javascript: media_selector.open();']);
        $ifr =  html_writer::tag('iframe', null, ['src' => "$EC_WWW/statics/media.png", 'frameborder' => '0']);
        $fitem = html_writer::div(html_writer::div(
            html_writer::div($button.$ifr,null, ['id' => 'mod_ms_browser_preview']),
            'felement'), 'fitem', ['id' => 'atto_easycastms_fitem']);

        $mform->addElement('html', $fitem);
        $mform->addElement('hidden', 'ms_mediaserverURL', $tool_base_URL);
        foreach (['ms_mediaserverURL'] as $name){
            $mform->setType($name, PARAM_TEXT);
            $elem =& $mform->getElement($name);
            $elem->_attributes['id'] = $name;
        }
    }
}
