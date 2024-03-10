import { GlobalState } from "./models/GlobalState";

export const demoProject: GlobalState = {
  vCanvas: null,
  editorState: {
    toolMode: "default",
    selectedLayerIds: ["a80ccc40-39b5-4be8-b5dc-8230d4987d00"],
    view: {
      showGrid: false,
      showRulers: false,
    },
    canvasView: {
      x: 0,
      y: 0,
      scale: 1,
    },
  },
  project: {
    id: "hoge",
    name: "New Project",
    canvasWidth: 960,
    canvasHeight: 540,
    layers: [
      {
        id: "3c49dea8-e427-454e-9908-845aaab0c0d9",
        name: "ColorInput",
        effects: [
          {
            type: "transform",
            x: 837.05517229545,
            y: 67.37951313632021,
            rotation: 0,
          },
          {
            type: "image",
            width: 192,
            height: 38,
            assetId: "6212c3dd-7a10-4383-9e05-2f96110a74b1",
          },
        ],
      },
      {
        id: "a80ccc40-39b5-4be8-b5dc-8230d4987d00",
        name: "Cmp UI",
        effects: [
          {
            id: "8fd6ae66-a1d8-4e83-8159-7c1945419152",
            type: "text",
            text: "Cmp UI",
            fontSize: 111.94076351059265,
            color: {
              h: 305.76,
              s: 0.6313131313131314,
              v: 0.7764705882352941,
              a: 1,
            },
            assetId: "8fd6ae66-a1d8-4e83-8159-7c1945419150",
          },
          {
            type: "transform",
            x: 465.997922113172,
            y: 279.7152145446985,
            rotation: -4.1421732704813685,
          },
        ],
      },
      {
        id: "a80ccc40-39b5-4be8-b5dc-8230d4987d0d",
        name: "ColorPickerCircle",
        effects: [
          {
            type: "image",
            width: 194,
            height: 222,
            assetId: "8fd6ae66-a1d8-4e83-8159-7c1945419156",
          },
          {
            type: "transform",
            x: 132.6759034654268,
            y: 391.1337182386849,
            rotation: 0,
          },
        ],
      },
      {
        id: "3c49dea8-e427-454e-9908-845aaab0c0d7",
        name: "Button",
        effects: [
          {
            type: "image",
            width: 84,
            height: 32,
            assetId: "6212c3dd-7a10-4383-9e05-2f96110a74b4",
          },
          {
            type: "transform",
            x: 731.1911515113638,
            y: 481.21184844134643,
            rotation: 0,
          },
        ],
      },
      {
        effects: [
          {
            type: "transform",
            x: 169.65049001115713,
            y: 168.82646115833433,
            rotation: 0,
          },
          {
            type: "image",
            width: 98,
            height: 112,
            assetId: "ac86c657-b78b-4232-9785-9190e0828e4a",
          },
        ],
        id: "66b4ebeb-bd1b-46cd-8c80-a479a9f47ca3",
        name: "components-controls-cubiccontrols--default.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 326.0578285058816,
            y: 105.65144304694806,
            rotation: 0,
          },
          {
            type: "image",
            width: 112,
            height: 74,
            assetId: "b6ddf309-c1d9-4a26-b09c-572fbff2fc0c",
          },
        ],
        id: "83ec5925-8937-4515-a269-d30ad5b5f702",
        name: "components-controls-rectgizmo--basic.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 208.52220945984328,
            y: 51.85316515686495,
            rotation: 0,
          },
          {
            type: "image",
            width: 162,
            height: 24,
            assetId: "89eab916-fc40-4257-a4da-07e3573d6584",
          },
        ],
        id: "926116ac-dfaf-41fc-813b-30ecd2bbfa0e",
        name: "components-float-menubarbutton--basic.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 474.92989373981464,
            y: 178.55411552745332,
            rotation: 0,
          },
          {
            type: "image",
            width: 90,
            height: 28,
            assetId: "c3bad27c-ffa6-4b3f-8d55-5f042d2ccf74",
          },
        ],
        id: "b1ddfe8b-ecd9-45dd-921f-a2f7ae43ac74",
        name: "components-float-tooltip--presenter.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 501.96195169656903,
            y: 71.91022876694895,
            rotation: 0,
          },
          {
            type: "image",
            width: 70,
            height: 64,
            assetId: "0c20ae45-b950-4be2-8432-dd15462b7b7d",
          },
        ],
        id: "8c953582-f77b-4ee2-9d9c-ddbc5b11c905",
        name: "components-form-angleinput--basic.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 767.9521882511715,
            y: 215.48321325108466,
            rotation: 0,
          },
          {
            type: "image",
            width: 68,
            height: 24,
            assetId: "cbcb981a-dcd3-4868-b50e-93cbd8e4d7b4",
          },
        ],
        id: "4723a9ae-d289-4039-9f47-7a438de52862",
        name: "components-form-checkbox--checked.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 62.93760234376342,
            y: 202.24931859026682,
            rotation: 0,
          },
          {
            type: "image",
            width: 88,
            height: 39,
            assetId: "89d44dbe-36e7-4820-a186-a6975bf7bec5",
          },
        ],
        id: "c7921892-91a7-4d84-aab2-74c4f70e6708",
        name: "components-form-select--fonts.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 630.5002557241455,
            y: 132.4854633959377,
            rotation: 0,
          },
          {
            type: "image",
            width: 200,
            height: 20,
            assetId: "0cfd9c81-c6f6-4445-86f1-91665577ba48",
          },
        ],
        id: "95049c12-507b-477f-8540-0529256a3541",
        name: "components-form-slider--basic.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 730.0403751292454,
            y: 349.3792429289925,
            rotation: 0,
          },
          {
            type: "image",
            width: 84,
            height: 24,
            assetId: "d818d3b6-f993-413a-94f0-f10ab53f4baa",
          },
        ],
        id: "04365c8e-f6dd-45a0-b86d-291d72266b0d",
        name: "components-form-switch--checked.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 844.7329071225414,
            y: 142.25429986313733,
            rotation: 0,
          },
          {
            type: "image",
            width: 194,
            height: 67,
            assetId: "5a0b8400-b809-4f3c-b469-8d245fd64e86",
          },
        ],
        id: "2e27c216-2091-43aa-814d-b318066c7de3",
        name: "components-form-textarea--basic.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 587.6184041347636,
            y: 410.81074852515076,
            rotation: 0,
          },
          {
            type: "image",
            width: 196,
            height: 38,
            assetId: "c31435c5-640b-4dd7-a1c4-78382a6d3e2b",
          },
        ],
        id: "a3fffa14-46f5-4a03-9592-866e6c7aadf8",
        name: "components-form-textinput--basic.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 338.23986437367313,
            y: 446.6917027749049,
            rotation: 0,
          },
          {
            type: "image",
            width: 144,
            height: 176,
            assetId: "1a883bf0-8209-466b-9f97-548f4e6b619c",
          },
        ],
        id: "7ff9b4ac-07d5-415d-bf8d-f496c47f36d9",
        name: "components-view-listitem--commands.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 379.0262212921819,
            y: 14.098757768518357,
            rotation: 0,
          },
          {
            type: "image",
            width: 1276,
            height: 23,
            assetId: "0a385d4a-24c8-4505-bde9-670650941a0c",
          },
        ],
        id: "f90173d8-8d51-4e6b-b0a9-9c0ff068ff11",
        name: "components-view-ruler--basic.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 875.2530332984962,
            y: 355.8634625764344,
            rotation: 0,
          },
          {
            type: "image",
            width: 116,
            height: 237,
            assetId: "f0c9e5c7-333f-4c10-8ffd-65aec3bf246e",
          },
        ],
        id: "31b98b6e-8300-4a20-b342-5a5951596590",
        name: "components-view-treeview--basic.png",
      },
      {
        effects: [
          {
            type: "transform",
            x: 658.8624740601008,
            y: 351.82102688689355,
            rotation: 0,
          },
          {
            type: "image",
            width: 1253,
            height: 653,
            assetId: "7aabd5c3-88f1-4a9e-a552-5371645e8bd3",
          },
        ],
        id: "0f9ecfae-ee99-4e18-aa8f-1d4e051bd3ca",
        name: "components-view-grid--basic.png",
      },
    ],
    assets: [
      {
        id: "6212c3dd-7a10-4383-9e05-2f96110a74b4",
        type: "image",
        name: "Goup.png",
        url: "/__screenshots__/components-actions-button--basic.png",
      },
      {
        id: "6212c3dd-7a10-4383-9e05-2f96110a74b1",
        type: "image",
        name: "Selected.png",
        url: "/__screenshots__/components-colors-colorinput--primary.png",
      },
      {
        id: "8fd6ae66-a1d8-4e83-8159-7c1945419156",
        type: "image",
        name: "Default.png",
        url: "/__screenshots__/components-colors-colorpickercircle--default.png",
      },
      {
        id: "8fd6ae66-a1d8-4e83-8159-7c1945419150",
        type: "font",
        name: "Smooch",
        url: "https://fonts.googleapis.com/css2?family=Smooch&display=swap",
      },
      {
        id: "8fd6ae66-a1d8-4e83-8159-7c1945419151",
        type: "font",
        name: "Agbalumo",
        url: "https://fonts.googleapis.com/css2?family=Agbalumo&display=swap",
      },
      { id: "Arial", type: "font", name: "Arial", url: "" },
      {
        name: "components-controls-cubiccontrols--default.png",
        id: "ac86c657-b78b-4232-9785-9190e0828e4a",
        type: "image",
        url: "/__screenshots__/components-controls-cubiccontrols--default.png",
      },
      {
        name: "components-controls-rectgizmo--basic.png",
        id: "b6ddf309-c1d9-4a26-b09c-572fbff2fc0c",
        type: "image",
        url: "/__screenshots__/components-controls-rectgizmo--basic.png",
      },
      {
        name: "components-float-floatbox--basic.png",
        id: "3b697671-fb69-42d0-97ad-b4ad3123ab5f",
        type: "image",
        url: "/__screenshots__/components-float-floatbox--basic.png",
      },
      {
        name: "components-float-menubarbutton--basic.png",
        id: "89eab916-fc40-4257-a4da-07e3573d6584",
        type: "image",
        url: "/__screenshots__/components-float-menubarbutton--basic.png",
      },
      {
        name: "components-float-tooltip--presenter.png",
        id: "c3bad27c-ffa6-4b3f-8d55-5f042d2ccf74",
        type: "image",
        url: "/__screenshots__/components-float-tooltip--presenter.png",
      },
      {
        name: "components-form-angleinput--basic.png",
        id: "0c20ae45-b950-4be2-8432-dd15462b7b7d",
        type: "image",
        url: "/__screenshots__/components-form-angleinput--basic.png",
      },
      {
        name: "components-form-checkbox--checked.png",
        id: "cbcb981a-dcd3-4868-b50e-93cbd8e4d7b4",
        type: "image",
        url: "/__screenshots__/components-form-checkbox--checked.png",
      },
      {
        name: "components-form-select--basic.png",
        id: "eb129035-10f4-40ea-b3aa-f3581f503434",
        type: "image",
        url: "/__screenshots__/components-form-select--basic.png",
      },
      {
        name: "components-form-select--fonts.png",
        id: "89d44dbe-36e7-4820-a186-a6975bf7bec5",
        type: "image",
        url: "/__screenshots__/components-form-select--fonts.png",
      },
      {
        name: "components-form-slider--basic.png",
        id: "0cfd9c81-c6f6-4445-86f1-91665577ba48",
        type: "image",
        url: "/__screenshots__/components-form-slider--basic.png",
      },
      {
        name: "components-form-slidernumberfield--basic.png",
        id: "670d7a3e-9e57-49b0-9287-73b6f5dfa46b",
        type: "image",
        url: "/__screenshots__/components-form-slidernumberfield--basic.png",
      },
      {
        name: "components-form-switch--checked.png",
        id: "d818d3b6-f993-413a-94f0-f10ab53f4baa",
        type: "image",
        url: "/__screenshots__/components-form-switch--checked.png",
      },
      {
        name: "components-form-textarea--basic.png",
        id: "5a0b8400-b809-4f3c-b469-8d245fd64e86",
        type: "image",
        url: "/__screenshots__/components-form-textarea--basic.png",
      },
      {
        name: "components-form-textinput--basic.png",
        id: "c31435c5-640b-4dd7-a1c4-78382a6d3e2b",
        type: "image",
        url: "/__screenshots__/components-form-textinput--basic.png",
      },
      {
        name: "components-view-grid--basic.png",
        id: "7aabd5c3-88f1-4a9e-a552-5371645e8bd3",
        type: "image",
        url: "/__screenshots__/components-view-grid--basic.png",
      },
      {
        name: "components-view-listitem--commands.png",
        id: "1a883bf0-8209-466b-9f97-548f4e6b619c",
        type: "image",
        url: "/__screenshots__/components-view-listitem--commands.png",
      },
      {
        name: "components-view-ruler--basic.png",
        id: "0a385d4a-24c8-4505-bde9-670650941a0c",
        type: "image",
        url: "/__screenshots__/components-view-ruler--basic.png",
      },
      {
        name: "components-view-treeview--basic.png",
        id: "f0c9e5c7-333f-4c10-8ffd-65aec3bf246e",
        type: "image",
        url: "/__screenshots__/components-view-treeview--basic.png",
      },
    ],
  },
};
