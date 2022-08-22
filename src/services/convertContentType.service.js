const xmljs = require('xml-js');
const yaml = require('json-to-pretty-yaml');

/**
 * @class ConvertContentType
 * @description Convert content to the corresponding content type. Default is JSON.
 */
class ConvertContentType {
    /**
     * Converts the content to the content type given by the Accept header.
     * 
     * @param object content 
     * @param Express.Request req 
     * @returns object|XML
     */
    convert = (content, req) => {
        if (req.headers.accept) {
            switch (req.headers.accept) {
                case "application/xml":
                    return this.convertToXml(content);
                case "application/x-yaml":
                    return this.convertToYaml(content);
            }
        }

        return content;
    }

    /**
     * Convert the content to XML.
     * @param object content 
     * @returns XML
     */
    convertToXml = (content) => {
        let toSend = xmljs.json2xml(content, { compact: true, spaces: 4, indentAttributes: true });
        toSend = `<?xml version="1.0" encoding="utf-8"?>
                  <Secret>
                    ${toSend}  
                  </Secret>`;

        return toSend;
    }

    /**
     * Convert the content to YAML.
     * @param object content 
     * @returns YAML
     */
    convertToYaml = (content) => {
        return yaml.stringify(content);
    }
}

module.exports = new ConvertContentType;