import { Checkbox, TextInput } from '@contentful/forma-36-react-components';
// import { init as initContentfulApp } from '@contentful/app-sdk';

import { useHistory } from 'react-router-dom';
import { Line } from 'rc-progress';

import React, { useEffect } from 'react';
import '../styles/custom.css';
import {
  Modal,
  Button,
  Paragraph,
} from '@contentful/forma-36-react-components';

function Home() {
  let history = useHistory();

  const [isShown, setShown] = React.useState(false);
  const [percent, Setpercent] = React.useState(10);
  const [apiKeyValue, setApiKeyValue] = React.useState('');

  const [spaces, setSpaces] = React.useState<any[]>([]);
  const [environments, setEnvironments] = React.useState<any[]>([]);
  const [contentTypes, setContentTypes] = React.useState<any[]>([]);

  const [importSpaceId, SetImportSpaceId] = React.useState('');
  const [importEnvironment, SetImportEnvironment] = React.useState<any>('');

  const [itemchecked, Setitemchecked] = React.useState<any>({});

  const [environmentValue, SetEnvironmentValue] = React.useState<any>({});

  const [checkedContentTypes, SetCheckedContentTypes] = React.useState<any>({});

  const [filteredContentTypes, setFilteredContentTypes] = React.useState<any>(
    []
  );
  const array: any = [];

  function checkedProperties(e: any) {
    let checkedSate = false;
    if (e.target.checked) {
      Object.keys(itemchecked).forEach(function (key) {
        itemchecked[key] = false;
      });
      Setitemchecked({
        ...itemchecked,
        [e.target.name]: true,
      });
      SetEnvironmentValue({ ...environmentValue, name: e.target.name });
      handleToggledEnvironment(e.target.name);
    } else {
      Setitemchecked({
        ...itemchecked,
        [e.target.name]: false,
      });
    }
  }

  function handleFilteredContents() {
    const filteredArray = contentTypes.filter(function (ele) {
      return ele > 5;
    });
  }

  function importContent(data: string) {
    let promiseArray: any = [];
    // showModal()
    filteredContentTypes.forEach(function (content: any) {
      promiseArray.push(
        fetch(
          `https://api.contentful.com/spaces/${importSpaceId}/environments/${importEnvironment}/content_types`,

          {
            method: 'post',
            headers: {
              Authorization: ` Bearer ${apiKeyValue}`,
            },
            body: JSON.stringify({
              name: content.name,
              fields: content.fields,
              description: content.description,
              displayField: content.displayField,
            }),
          }
        )
      );
    });
  }

  function showModal() {
    setShown(true);
    setInterval(function () {
      Setpercent(percent + 60);
    }, 1000);
    setInterval(function () {
      Setpercent(100);
    }, 3000);
    setTimeout(function () {
      history.push('/importing');
    }, 7000);
  }

  function getEnvironments() {
    fetch('https://api.contentful.com/spaces/za6nliv80lnb/environments', {
      headers: {
        Authorization: ` Bearer ${apiKeyValue}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEnvironments(data.items);
      });
  }

  function hideModal() {
    setShown(false);
  }

  function SubmitApiKey(val: string) {
    setApiKeyValue(val);
  }

  function handleApikeySubmit(apikey: string) {
    if (apikey !== '') {
      console.log('Good');
      fetch('https://api.contentful.com/spaces', {
        headers: {
          Authorization: ` Bearer ${apiKeyValue}`,
        },
      })
        .then((json) => json.json())
        .then((data) => {
          setSpaces(data.items);
        });
    } else {
      console.log('error');
    }
  }
  interface Space {
    name: string;
  }

  function handleToggledSpace(space: Space) {
    getEnvironments();
  }

  function handleToggledEnvironment(env: any) {
    fetch(
      `https://api.contentful.com/spaces/za6nliv80lnb/environments/${env}/content_types`,
      {
        headers: {
          Authorization: ` Bearer ${apiKeyValue}`,
        },
      }
    )
      .then((json) => json.json())
      .then((data) => {
        setContentTypes(data.items);
      });
  }

  useEffect(() => {}, []);

  function handleCheckedContentTypes(e: any, contentElemnt: any) {
    if (e.target.checked) {
      SetCheckedContentTypes({
        ...checkedContentTypes,
        [e.target.name]: e.target.checked,
      });
      let newarray = [];
      newarray.push({
        name: contentElemnt.name,
        fields: contentElemnt.fields,
        description: contentElemnt.description,
        displayField: contentElemnt.displayField,
      });
      setFilteredContentTypes([...filteredContentTypes, ...newarray]);

      // console.log(filteredContentTypes)
    } else {
      SetCheckedContentTypes({
        ...checkedContentTypes,
        [e.target.name]: false,
      });

      let uncheckedvalues = filteredContentTypes.filter(function (ele: any) {
        return ele.name !== e.target.name;
      });
      setFilteredContentTypes([...uncheckedvalues]);
      console.log(filteredContentTypes);
    }
  }

  return (
    <div>
      <div className="page-wrapper">
        <div className=" display-flex">
          <form className="form_wrapper">
            <div>
              <Paragraph element="h1">Contentful Import</Paragraph>
            </div>

            <div className="form">
              <div className="form-border">
                <div className="form-import__wrapper">
                  <div>
                    <Paragraph element="h1">
                      {' '}
                      Management Token to access where to import from{' '}
                    </Paragraph>
                  </div>
                  <div className="">
                    <div className="management__token">
                      <TextInput
                        name="example"
                        width="medium"
                        className="f36-margin-bottom--m"
                        value=""
                        placeholder="Enter management Api token"
                        onChange={(e) => SubmitApiKey(e.target.value)}
                      />
                      <div className="management__token__button">
                        <Button onClick={() => handleApikeySubmit(apiKeyValue)}>
                          Go
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-import__wrapper">
                  <div>
                    <Paragraph element="h1">
                      {' '}
                      Select spaces to import from{' '}
                    </Paragraph>
                  </div>
                  <div className="checkbox_wrapper">
                    <ul className="checkbox_wrapper-list">
                      {spaces.map(function (space) {
                        return (
                          <li className="checkbox_wrapper-list-item">
                            <Checkbox
                              onClick={() => handleToggledSpace(space)}
                              labelText=""
                              name={space.name}
                              id="checkbox"
                            />
                            <div className="checkbox_wrapper-list-item-paragraph">
                              <Paragraph>{space.name} </Paragraph>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="total-contents">
                    <Paragraph element="h1">1 spaces</Paragraph>
                  </div>
                </div>
                <div className="form-import__wrapper">
                  <div>
                    <Paragraph element="h1">
                      {' '}
                      Select Environments Types to import from{' '}
                    </Paragraph>
                  </div>
                  <div className="checkbox_wrapper">
                    <ul className="checkbox_wrapper-list">
                      {environments.map(function (environment) {
                        return (
                          <li className="checkbox_wrapper-list-item">
                            <Checkbox
                              checked={itemchecked[environment.name]}
                              onClick={(e) => {
                                checkedProperties(e);
                              }}
                              labelText=""
                              name={environment.name}
                              id="checkbox"
                            />

                            <div className="checkbox_wrapper-list-item-paragraph">
                              <Paragraph>{environment.name} </Paragraph>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="total-contents">
                    <Paragraph element="h1"> 3 spaces </Paragraph>
                  </div>
                </div>
                <div className="form-import__wrapper">
                  <div className="import-title">
                    <Paragraph element="h1">
                      {' '}
                      Select Content to import{' '}
                    </Paragraph>
                  </div>
                  <div className="checkbox_wrapper">
                    <ul className="checkbox_wrapper-list">
                      {contentTypes.map(function (content) {
                        return (
                          <li className="checkbox_wrapper-list-item">
                            <Checkbox
                              checked={checkedContentTypes[content.name]}
                              onClick={(e) =>
                                handleCheckedContentTypes(e, content)
                              }
                              labelText=""
                              name={content.name}
                              id="checkbox"
                            />
                            <div className="checkbox_wrapper-list-item-paragraph">
                              <Paragraph>{content.name} </Paragraph>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="total-contents">
                    <Paragraph element="h1"> 240 content itmes </Paragraph>
                  </div>
                </div>
              </div>
              <div>
                <br />
                <br />
                <br />
                <Paragraph element="p">Import to</Paragraph>
                <br />

                <form>
                  <Paragraph element="p">space id</Paragraph>

                  <TextInput
                    name="example"
                    width="medium"
                    className="f36-margin-bottom--m"
                    placeholder="enter space id to import to "
                    value={importSpaceId}
                    onChange={(e) => SetImportSpaceId(e.target.value)}
                  />
                  <Paragraph element="p">enviroment</Paragraph>
                  <TextInput
                    name="example"
                    width="medium"
                    className="f36-margin-bottom--m"
                    value={importEnvironment}
                    placeholder="enter environment  to import to "
                    onChange={(e) => SetImportEnvironment(e.target.value)}
                  />
                </form>
                {importSpaceId}
                {importEnvironment}
              </div>
              <div className="import_submit-wrapper ">
                <div>
                  <Paragraph element="p">
                    Are you ready to import ? This cannot be undone{' '}
                  </Paragraph>
                </div>
                <div>
                  <Button onClick={() => importContent('')}>Import</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <React.Fragment>
        <Modal
          onClose={() => hideModal()}
          title="Centered modal"
          isShown={isShown}
        >
          {() => (
            <React.Fragment>
              <div className="modal-wrapper-importing">
                <Modal.Content>importing</Modal.Content>
                <div className="progressbar-wrapper">
                  <Line
                    className="progressbar"
                    percent={`${percent}`}
                    strokeWidth="1"
                    strokeColor="#2E75D4"
                  />
                </div>

                <div>
                  <Paragraph>Content Type 3/3</Paragraph>
                </div>
                <div>
                  <Paragraph>Content 1/10</Paragraph>
                </div>
              </div>
            </React.Fragment>
          )}
        </Modal>
      </React.Fragment>
    </div>
  );
}

export default Home;
