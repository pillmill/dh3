define(['underscore'], function(_) {
  var build_form;
  build_form = function(child, path, lang) {
    var label, schema_dict, tmpl, _ref, _ref1,
      _this = this;
    label = '';
    if (typeof child.label === 'object') {
      label = child.label[lang];
      if (this.languages.length === 0) {
        _.each(child.label, function(child, key) {
          return _this.languages.push(key);
        });
      }
    } else {
      label = child.label;
    }
    schema_dict = {
      help: child.hint,
      title: label,
      is_field: true,
      bind: child.bind,
      tree: path
    };
    if (child.relationship != null) {
      schema_dict['type'] = 'Text';
      tmpl = '<div id="<%= editorId %>_field" data-key="<%= editorId %>" class="control-group">' + '<label for="<%= editorId %>""><%= title %></label>' + ("<input data-repo='" + child.relationship.repo + "' data-field='" + child.relationship.field + "'") + 'class="autofill" type="text" name="<%= editorId %>">' + '</div>';
      schema_dict['template'] = _.template(tmpl);
    } else if ((_ref = child.type) === 'string' || _ref === 'text') {
      if ((child.bind != null) && child.bind.readonly) {
        schema_dict['template'] = _.template('<div id="<%= editorId %>_field" data-key="<%= editorId %>" class="control-group">\
                                                        <strong></strong><%= title %>\
                                                   </div>');
        schema_dict['is_field'] = false;
      }
      schema_dict['type'] = 'Text';
    } else if ((_ref1 = child.type) === 'decimal' || _ref1 === 'int' || _ref1 === 'integer') {
      schema_dict['type'] = 'Number';
    } else if (child.type === 'date') {
      schema_dict['type'] = 'Date';
    } else if (child.type === 'geopoint') {
      schema_dict["template"] = _.template("<div id=\"<%= editorId %>_field\" data-key=\"<%= editorId %>\" class=\"control-group\">                                                                  <strong></strong><%= title %><br>                                                                  <input id=\"<%= editorId %>\" type=\"hidden\" name=\"<%= editorId %>\" >                                                                  <div id=\"<%= editorId %>_map\" style=\"width:100%; height: 500px; position: relative;\"></div>                                                   </div>");
      schema_dict['bind'] = {
        map: true
      };
    } else if (child.type === 'today') {
      schema_dict['type'] = 'Date';
      schema_dict['title'] = 'Today';
    } else if (child.type === 'time') {
      schema_dict['type'] = 'DateTime';
    } else if (child.type === 'trigger') {
      schema_dict['type'] = 'Checkbox';
    } else if (child.type === 'note') {
      schema_dict['type'] = 'Text';
      schema_dict['template'] = _.template('<div id="<%= editorId %>_field" data-key="<%= editorId %>" class="control-group">\
                                                        <%= title %>\
                                                   </div>');
      schema_dict['is_field'] = false;
    } else if (child.type === 'datetime') {
      schema_dict['type'] = 'DateTime';
    } else if (child.type === 'photo') {
      schema_dict['type'] = 'Text';
      schema_dict['template'] = _.template("<div id='<%= editorId %>_field' data-key='<%= editorId %>' class='control-group'>                                                        <label for='<%= editorId %>'><%= title %></label>                                                        <input type='file' name='<%= editorId %>' accept='image/*'></input>                                                   </div>");
    } else if (child.type === 'video') {
      schema_dict['type'] = 'Text';
      schema_dict['template'] = _.template("<div id='<%= editorId %>_field' data-key='<%= editorId %>' class='control-group'>                                                        <label for='<%= editorId %>'><%= title %></label>                                                        <input type='file' name='<%= editorId %>' accept='video/*'></input>                                                   </div>");
    } else if (child.type === 'select all that apply') {
      schema_dict['type'] = 'Checkboxes';
      schema_dict['options'] = [];
      _.each(child.choices, function(option) {
        var choice_label;
        choice_label = option.label;
        if (typeof option.label === 'object') {
          choice_label = option.label[lang];
        }
        return schema_dict['options'].push({
          val: option.name,
          label: choice_label
        });
      });
    } else if (child.type === 'group') {
      schema_dict["is_field"] = false;
      schema_dict["type"] = 'Text';
      schema_dict["tree"] = schema_dict["tree"] + child.name + "/";
      schema_dict["control"] = child.control;
      schema_dict["bind"] = {
        group_start: true
      };
      schema_dict['template'] = _.template('<div id="<%= editorId %>_field" data-key="<%= editorId %>" class="control-group">\
                                            <%= title %>\
                                       </div>');
      this.item_dict[child.name] = schema_dict;
      this._fieldsets.push(child.name);
      _.each(child.children, function(_child) {
        return _this.recursiveAdd(_child, schema_dict["tree"]);
      });
      return this;
    } else if (child.type === 'select one') {
      if (child.control && child.control.appearance === 'minimal') {
        schema_dict['type'] = 'Select';
      } else {
        schema_dict['type'] = 'Radio';
      }
      schema_dict['options'] = [];
      _.each(child.choices, function(option) {
        var choice_label;
        choice_label = option.label;
        if (typeof option.label === 'object') {
          choice_label = option.label[lang];
        }
        return schema_dict['options'].push({
          val: option.name,
          label: choice_label
        });
      });
    } else if (child.type === 'calculate') {
      schema_dict["template"] = _.template("<div id=\"<%= editorId %>_field\" data-key=\"<%= editorId %>\" class=\"control-group\">                                                                                                                <input id=\"<%= editorId %>\" type=\"hidden\" name=<%= editorId %>                                                    </div>");
    } else {
      schema_dict['type'] = 'Text';
      schema_dict['template'] = _.template('<div id="<%= editorId %>_field" data-key="<%= editorId %>" class="control-group">\
                                                        <label for="<%= editorId %>"><strong>Unsupported:</strong><%= title %></label>\
                                                   </div>');
    }
    this.item_dict[child.name] = schema_dict;
    this._fieldsets.push(child.name);
    return this._data[child.name] = child["default"];
  };
  return build_form;
});
