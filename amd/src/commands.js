// This file is part of Moodle - https://moodle.org/
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
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Commands helper for the Moodle tiny_stack plugin.
 *
 * @module      tiny_stack/commands
 * @copyright   2024 Marcus Green
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getButtonImage} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import {
    component,
    stackButtonName,
    stackMenuItemName,
    icon,
} from './common';

/**
 * Handle the action for your plugin.
 * @param {TinyMCE.editor} editor The tinyMCE editor instance.
 */
const handleAction = (editor) => {
    // TODO Handle the action.
    window.console.log(editor);
};

/**
 * Get the setup function for the buttons.
 *
 * This is performed in an async function which ultimately returns the registration function as the
 * Tiny.AddOnManager.Add() function does not support async functions.
 *
 * @returns {function} The registration function to call within the Plugin.add function.
 */
export const getSetup = async() => {
    const [
        stackButtonNameTitle,
        stackMenuItemNameTitle,
        buttonImage,
    ] = await Promise.all([
        getString('button_stack', component),
        getString('menuitem_stack', component),
        getButtonImage('icon', component),
    ]);

    return (editor) => {

        // Check whether we are editing a question.
        const body = document.querySelector('body#page-question-type-stack form');
        // And if the editor is used on the question text.
        if (!body || editor.id.indexOf('questiontext') === -1) {
            return;
        }
        // Register the Moodle SVG as an icon suitable for use as a TinyMCE toolbar button.
        editor.ui.registry.addIcon(icon, buttonImage.html);

        // Register the stack Toolbar Button.
        editor.ui.registry.addButton(stackButtonName, {
            icon,
            tooltip: stackButtonNameTitle,
            onAction: () => handleAction(editor),
        });

        // Add the stack Menu Item.
        // This allows it to be added to a standard menu, or a context menu.
        editor.ui.registry.addMenuItem(stackMenuItemName, {
            icon,
            text: stackMenuItemNameTitle,
            onAction: () => handleAction(editor),
        });
    };
};
