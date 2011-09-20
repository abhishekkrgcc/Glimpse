﻿        keyValue = function () {
            var //Main
                build = function (data, level, forceFull, forceLimit) {  
                    var that = this, limit = $.isNaN(forceLimit) ? 3 : forceLimit;
                    if (that.shouldUsePreview($.glimpse.util.lengthJson(data), level, forceFull, limit, forceLimit, 1))
                        return buildPreview(data, level);
                
                    var i = 1, html = '<table><thead><tr class="glimpse-row-header-' + level + '"><th class="glimpse-cell-key">Key</th><th class="glimpse-cell-value">Value</th></tr></thead>';
                    for (var key in data)
                        html += '<tr class="' + (i++ % 2 ? 'odd' : 'even') + '"><th width="30%">' + $.glimpseContent.formatString(key) + '</th><td width="70%"> ' + that.build(data[key], level + 1) + '</td></tr>';
                    html += '</table>';
                    return html;
                }, 
                buildPreview = function (data, level) {
                    var that = this;
                    return '<table class="glimpse-preview-table"><tr><td class="glimpse-preview-cell"><div class="glimpse-expand"></div></td><td><div class="glimpse-preview-object">' + buildPreviewOnly(data, level) + '</div><div class="glimpse-preview-show">' + build(data, level, true) + '</div></td></tr></table>';
                },
                buildPreviewOnly = function (data, level) {
                    var that = this, length = $.glimpse.util.lengthJson(data), rowMax = 2, rowLimit = (rowMax < length ? rowMax : length), i = 1, html = '<span class="start">{</span>';

                    for (var key in data) {
                        html += that.newItemSpacer(i, rowLimit, length);
                        if (i > length || i++ > rowLimit)
                            break;
                        html += '<span>\'</span>' + that.buildStringPreview(key, level + 1) + '<span>\'</span><span class="mspace">:</span><span>\'</span>' + that.buildStringPreview(data[key], level, 12) + '<span>\'</span>';
                    }
                    html += '<span class="end">}</span>';

                    return html;
                };
 
            return {
                build : build,
                buildPreview : buildPreview,
                buildPreviewOnly : buildPreviewOnly
            }; 
        } ()