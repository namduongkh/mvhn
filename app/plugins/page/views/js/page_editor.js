import axios from "axios";
import grapesjs from 'grapesjs';
import grapesjsPresetWebpage from 'grapesjs-preset-webpage';

$(async function () {
  if (!document.getElementById('gjs')) return;

  $('#footer').hide();

  let sectionId = $('#gjs').data('sectionId');
  let landingPage = {};

  if (sectionId) {
    let resp = await axios.get("/page_sections/" + sectionId);
    landingPage.html = resp.data.html;
    landingPage.css = resp.data.css;
  }

  var editor = grapesjs.init({
    container: '#gjs',
    storageManager: { type: null },
    components: landingPage.html,
    style: landingPage.css,
    plugins: [grapesjsPresetWebpage]
  });

  editor.Commands.add
    ('save-db',
      {
        run: function (editor, sender) {
          sender && sender.set('active', 0); // turn off the button
          save();
        }
      });

  editor.Panels.addButton
    ('options',
      [{
        id: 'save-db',
        className: 'fa fa-floppy-o',
        command: 'save-db',
        attributes: { title: 'Save DB' }
      }]
    );

  function save() {
    var htmldata = editor.getHtml();
    var cssdata = editor.getCss();

    if (!sectionId) {
      axios.post("/page_sections", {
        html: htmldata,
        css: cssdata
      }).then(({ data }) => {
        window.location.href = "/page_sections/" + data._id;
      });
    } else {
      axios.put("/page_sections/" + sectionId, {
        html: htmldata,
        css: cssdata
      }).then(({ data }) => {
        toastr.success("Saved!");
      });
    }
  }
});
