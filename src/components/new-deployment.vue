<template>
    <Row>
        <Col span="16" offset="4">
            <Form :model="newbee" :label-width="80">
                <Form-item label="App">
                    <Input v-model="newbee.name" placeholder="App Name"></Input>
                </Form-item>
                <Form-item v-for="(c, i) in newbee.containers" :key="i" :label="'Image' + (i + 1)">
                    <Row type="flex" justify="space-between">
                        <Col span="10"><Input v-model="c.name" placeholder="Image Name"></Input></Col>
                        <Col span="10"><Input v-model="c.image" placeholder="Image Address"></Input></Col>
                        <Col span="3">
                            <Tooltip content="Remove this image" placement="bottom" style="float: right;">
                                <Button type="ghost" style="color: #ff3300;" @click="removeContainer(i)" :disabled="!canRemoveContainer">
                                    <Icon type="minus-round"></Icon>
                                </Button>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row  type="flex" justify="space-between" v-for="(v, i) in c.volumes" :key="i" :label="'Volume' + (i + 1)">
                        <Col span="10"><Input v-model="v.mountPath" placeholder="Set mouint point(eg. /path/data)"></Input></Col>
                        <Col span="10">
                            <Select v-model="v.name" placeholder="Chose Volume">
                                <Option key="" value="empty-dir">
                                    EmptyDir
                                </Option>
                                <Option v-for="vo in volumes" :key="vo.name" :value="vo.name">
                                    {{vo.name}}
                                </Option>
                            </Select>
                        </Col>
                        <Col span="3">
                            <Tooltip content="Remove this volume" placement="bottom" style="float: right;">
                                <Button type="ghost" style="color: #ff3300;" @click="removeVolume(c, i)">
                                    <Icon type="minus-round"></Icon>
                                </Button>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <Tooltip content="Add more volume" placement="bottom">
                                <Button type="ghost" style="color: #00cc66;" @click="addVolume(c)">
                                    Attach Volume
                                </Button>
                            </Tooltip>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item>
                    <Tooltip content="Add more image" placement="bottom">
                        <Button type="ghost" style="color: #00cc66;" @click="addContainer">
                            <Icon type="plus-round"></Icon>
                        </Button>
                    </Tooltip>
                </Form-item>
                <Form-item>
                    <Tooltip content="Commit this deployment" placement="bottom">
                        <Button type="ghost" @click="deploy">Deploy</Button>
                    </Tooltip>
                    <Tooltip content="Cancel and go back" placement="bottom">
                        <Button type="ghost" @click="cancel">Cancel</Button>
                    </Tooltip>
                </Form-item>
            </Form>
        </Col>
    </Row>
</template>

<script>
    export default {
        data: function() {
            return {
                newbee: {           // New deployment
                    name: null,
                    owner: this.$route.params.username,
                    containers: [
                        {
                            name: null,
                            image: null,
                            volumes: []
                        }
                    ]
                }
            }
        },
        mounted: function() {
            this.$http.get('users/' + this.$route.params.username + '/volumes').then(response => {
                this.volumes = response.data;
            }, response => {
                this.$Message.error('Load volumes failed!');
            });
        },
        computed: {
            canRemoveContainer: function() {
                return this.newbee.containers.length > 1;
            }
        },
        methods: {
            addVolume(c) {
                c.volumes.push({
                    name: null,
                    mountPath: null,
                });
            },
            removeVolume(c, i) {
                c.volumes.splice(i, 1);
            },
            addContainer() {
                this.newbee.containers.push({
                    name: null,
                    image: null,
                    volumes: []
                });
            },
            removeContainer(i) {
                this.newbee.containers.splice(i, 1);
            },
            deploy() {
                this.$http.post('users/' + this.$route.params.username + '/deployments', this.newbee).then(response => {
                    this.$Message.success('Deploy success!');
                    this.$router.push({ name: "deployment" });
                }, response => {
                    this.$Message.error('Deploy failed!');
                });
            },
            cancel() {
                this.$router.push({ name: "deployment" });
            }
        }
    }
</script>
