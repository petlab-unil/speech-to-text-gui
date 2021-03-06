import React, {ChangeEvent, Component} from "react";
import {TranscriptionEvent} from "../../types/transcriptionEvent";
import {Select} from "@components/fileStream/select";
import {wsHandler} from "@components/fileStream/wsHandler";
import {audioTypes, languageOptions, modelOptions} from "@components/fileStream/selectOptions";
import {TranscriptionText} from "@components/transcriptionText";
import {
    Button,
    FormEntry,
    FormSection,
    ParamGrid,
    Input,
    Label,
    PlusLabel,
    SmallParamGrid, Surrounding, AddFileText
} from "@components/fileStream/input";
import Styled from "styled-components";
import {SectionTitle} from "@components/global/sectionTitle";

const WhiteBar = Styled.div`
    background-color: white;
    width: 100%;
    height: 30px;
    grid-column-start: 1;
    grid-column-end: 3;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    border: 1px groove white;
`;

const GreenBar = Styled.div`
    background-color: #636c78;
    height: 30px;
    border-radius: 5px;
`;

const BarText = Styled.div`
    color: black;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 30px;
    line-height: 30px;
    text-align: center;
`;

interface ManagerProps {
    auth: string
}

interface ManagerState {
    file: File,
    transcriptions: TranscriptionEvent[],
    errors: string[],
    kb: number,
    sampleRateHertz: number,
    audioType: number,
    model: string,
    language: string,
    barSize: number,
    closed: boolean
}

export class FileStream extends Component<ManagerProps, ManagerState> {
    private auth: string;

    public state: ManagerState = {
        file: null,
        transcriptions: [],
        errors: [],
        kb: 32,
        sampleRateHertz: 16000,
        audioType: 0,
        model: "default",
        language: "fr-FR",
        barSize: 0,
        closed: false
    };

    constructor(props) {
        super(props);

        this.auth = props.auth;
    }

    uploadFile = () => {
        const reader = new FileReader();
        const {name} = this.state.file;
        const self = this;
        reader.onload = function () {
            const arrayBuffer: string | ArrayBuffer = this.result;
            const array = new Uint8Array(arrayBuffer as ArrayBuffer);
            const onData = (newTranscription: TranscriptionEvent) => {
                const transcriptions = self.state.transcriptions.concat(newTranscription);
                self.setState({transcriptions});
            };

            const onError = (error: string) => {
                console.log(error);
                const errors = self.state.errors.concat(error);
                self.setState({errors});
            };

            const updateBar = (size: number) => {
                self.setUpdateBarSize(size);
            };

            const onClose = (_: number) => {
                self.setState({closed: true});
            };

            wsHandler(self.state.kb,
                self.state.sampleRateHertz,
                self.state.audioType,
                self.state.language,
                self.state.model,
                self.auth,
                name,
                array,
                updateBar,
                onData,
                onError,
                onClose);
        };

        reader.readAsArrayBuffer(this.state.file);
    };

    setUpdateBarSize = (size: number) => {
        this.setState({barSize: size, closed: false});
    };

    updateFile = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({file: e.target.files[0], closed: false});
    };

    updateKb = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({kb: parseInt(e.target.value), closed: false});
    };

    updateHertz = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({sampleRateHertz: parseInt(e.target.value)});
    };

    updateAudioType = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({audioType: parseInt(e.target.value)});
    };

    updateModel = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({model: e.target.value});
    };

    updateLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({language: e.target.value});
    };

    render() {
        return (
            <>
                <SectionTitle>
                    Transcribe An Audio File
                </SectionTitle>
                {
                    !this.state.file && <Surrounding>
                        <SmallParamGrid>
                            <PlusLabel htmlFor="file">+</PlusLabel>
                            <AddFileText>
                                Add your file to be transcribed
                            </AddFileText>
                            <input id="file" type="file"
                                   style={{display: "none"}}
                                   onChange={this.updateFile}
                            />
                        </SmallParamGrid>
                    </Surrounding>
                }
                {!!this.state.file && <Surrounding>
                    <ParamGrid>
                        <FormSection>
                            <Label htmlFor="file">{!!this.state.file ? this.state.file.name : "Input File"}</Label>
                            <input id="file" type="file"
                                   style={{display: "none"}}
                                   onChange={this.updateFile}
                            />
                        </FormSection>
                        <FormSection>
                            <FormEntry>Upload rate (kB)</FormEntry>
                            <Input type="number"
                                   onChange={this.updateKb}
                                   placeholder="Number of kb per packet"
                                   value={this.state.kb}
                            />
                        </FormSection>
                        <FormSection>
                            <FormEntry>Hertz Audio Encoding</FormEntry>
                            <Input type="number"
                                   onChange={this.updateHertz}
                                   placeholder="Number of hertz in audio code"
                                   value={this.state.sampleRateHertz}
                            />
                        </FormSection>
                        <FormSection>
                            <FormEntry>Audio type</FormEntry>
                            <Select onChange={this.updateAudioType}
                                    value={this.state.audioType}
                                    options={audioTypes}
                                    right={true}
                            />
                        </FormSection>
                        <FormSection>
                            <FormEntry>Transcription Model</FormEntry>
                            <Select
                                options={modelOptions}
                                value={this.state.model}
                                onChange={this.updateModel}
                                right={true}
                            />
                        </FormSection>
                        <FormSection>
                            <FormEntry>Language</FormEntry>
                            <Select
                                options={languageOptions}
                                value={this.state.language}
                                onChange={this.updateLanguage}
                                right={true}
                            />
                        </FormSection>
                        <Button onClick={this.uploadFile}>Translate</Button>
                        {this.state.barSize > 0 && <WhiteBar>
                            <GreenBar style={{width: `${this.state.barSize}%`}}/>
                            {this.state.closed ?
                                <BarText>Connection closed</BarText> :
                                this.state.barSize >= 100 ?
                                    <BarText>Upload complete, please wait for Google to terminate the
                                        translation</BarText> :
                                    <BarText>Uploading ({this.state.barSize.toFixed(2)}%)</BarText>
                            }
                        </WhiteBar>}
                    </ParamGrid>
                </Surrounding>}

                {
                    (this.state.errors.length > 0) && (
                        <div>Errors:
                            <div>
                                {this.state.errors.map(e => <div>{JSON.stringify(e)}</div>)}
                            </div>
                        </div>
                    )
                }
                {this.state.transcriptions.length > 0 &&
                <TranscriptionText transcriptions={this.state.transcriptions}/>}
            </>
        );
    }
}