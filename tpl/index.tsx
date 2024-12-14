import { JSX, DispatchWithoutAction } from "react";
import { IDCElement } from "idc-custom-elements";

interface ElementParameters {};

const Element = ({
  dragged,
  vendored,
  setVariable,
  getVariable,
  forceUpdate,
  ...params
}: {
  dragged: boolean;
  vendored?: any;
  setVariable: (name: string, value: string) => void;
  getVariable: (name: string) => string | undefined;
  forceUpdate: DispatchWithoutAction;
}): JSX.Element => {
  const parameters = params as ElementParameters;
  return <>Element</>;
};

const element = new IDCElement("%NAME%", Element)
  .description("%NAME%")
  .iconDraw(() => <div style={{ fontSize: 21 }}>🌍</div>);

export default element.export();
