<template>
    <Row>
        <Col span="16" offset="4">
            <Form :model="newbee" :label-width="80">
                <Form-item label="Name">
                    <Input v-model="newbee.name" placeholder="Volume Name"></Input>
                </Form-item>
                <Form-item>
                    <Tooltip content="Commit this volume" placement="bottom">
                        <Button type="ghost" @click="commit" :disabled="!commitable">Commit</Button>
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
                    name: '',
                    owner: this.$route.params.username,
                }
            }
        },
        methods: {
            commit() {
                this.$http.post('users/' + this.$route.params.username + '/volumes', this.newbee).then(response => {
                    this.$Message.success('Add success!');
                    this.$router.push({ name: "volume" });
                }, response => {
                    this.$Message.error('Add failed!');
                });
            },
            cancel() {
                this.$router.push({ name: "volume" });
            }
        },
        computed: {
            commitable() {
                return !this.newbee.name.startsWith("empty-dir");
            }
        }
    }
</script>
