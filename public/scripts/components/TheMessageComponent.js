export default {
    props: ['msg', 'socketid'],

    template:
    `
    <article class="new-message" :class="{ 'my-message' : matchedID }">
        <p>{{msg.message.username}} &#10084; {{msg.message.content}}</p>
    </article>

    `,
    
    data: function() {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }
}