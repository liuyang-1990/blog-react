import React, { ComponentType } from "react";
import { renderToString } from 'react-dom/server';


let docType = "<!DOCTYPE html>";
let render = <T extends unknown>(Component: ComponentType, props: T) =>
    renderToString(<Component {...props} />);

export { render }
