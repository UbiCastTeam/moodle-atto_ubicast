UbiCast MediaServer Atto button plugin
===========================================

Copyright: UbiCast (https://www.ubicast.eu)
License: https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later


Description:
------------

This Atto button plugin allows users to add media from an UbiCast MediaServer in their Moodle course from the Atto editor directly.


Dependencies:
-------------

* The UbiCast base plugin: `mod_ubicast` (https://github.com/UbiCastTeam/moodle-mod_ubicast).
* A UbiCast MediaServer web site (version >= *8.1*). Visit https://www.ubicast.eu/en/solutions/delivery/ to ask for a trial.
* Cookies must be allowed for the MediaServer web site (see note below).


Important note about cookies:
-----------------------------

In order to make the LTI authentication work, MediaServer needs cookies usage.
If your MediaServer is using a domain totally different from your Moodle domain, cookies will probably get blocked by browsers because they will be classified as third party cookies.
To avoid MediaServer cookies to be considered as third party cookies, we recommend to use a sub domain for MediaServer using the same top domain as the Moodle site (for example, if your Moodle uses `moodle.yourdomain.com` as domain, you can use `mediaserver.yourdomain.com` as MediaServer domain).
It is also possible to allow third party cookies usage in the browser settings.


Installation:
-------------

* In the Moodle server, go to the Moodle atto plugins directory: `cd lib/editor/atto/plugins`
* Clone the repository: `git clone https://github.com/UbiCastTeam/moodle-atto_ubicast.git ubicast`
* Visit Moodle as administrator
* Navigate to Dashboard (upgrade your Moodle)
* Navigate to Site administration > Plugins > Text editors > Atto HTML editor > Atto toolbar settings
* Add `ubicast` in the `files` section of the toolbar config (for example, the `files` section may be `files = image, media, recordrtc, managefiles, ubicast`) or add `ubicast = ubicast` at the end.


Usage:
------

* Adding a media

![Adding a media](../assets/insert-media.png)

1. Click on the MediaServer button.
2. Select the media which should be embedded.
3. Click on "insert" and it's done!

* Professor view

![Professor view](../assets/professor-view.jpg)

* Student view

![Student view](../assets/student-view.jpg)


Development:
-----------

If you don't have anything set up, follow the `Development Environment` setup instructions in https://github.com/UbiCastTeam/moodle-mod_ubicast

Then:

* Copy this folder into the `lib/editor/atto/plugins` folder of your moodle installation.
* In command-line, go to the `yui/src` subfolder of the plugin
* If you don't have it already, install `shifter` globally (`npm install -g shifter` or `yarn global add shifter`)
* Run `shifter --watch`


How does it work?
-----------------

This plugin relies heavily on the https://github.com/UbiCastTeam/moodle-mod_ubicast plugin's LTI video integration mechanism that you can read on in said README.

What the Atto plugin does is only opening a modal asking for the video ID and inserts an iframe the same way the `moodle-mod_ubicast` does.


Relevant Moodle Documentation:
----------------------

* https://docs.moodle.org/dev/Atto (pretty incomplete, sadly)
* https://docs.moodle.org/dev/YUI/Modules
* The `lib/editor/atto/plugins` folder and Ctrl+F are your best friends!
