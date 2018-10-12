const treenode = [
    {
        key:"0-0-0",
        title: "1.c",
        code: "/* C demo code */\n" +
        "\n" +
        "#include <zmq.h>\n" +
        "#include <pthread.h>\n" +
        "#include <semaphore.h>\n" +
        "#include <time.h>\n" +
        "#include <stdio.h>\n" +
        "#include <fcntl.h>\n" +
        "#include <malloc.h>\n" +
        "\n" +
        "typedef struct {\n" +
        "  void* arg_socket;\n" +
        "  zmq_msg_t* arg_msg;\n" +
        "  char* arg_string;\n" +
        "  unsigned long arg_len;\n" +
        "  int arg_int, arg_command;\n" +
        "\n" +
        "  int signal_fd;\n" +
        "  int pad;\n" +
        "  void* context;\n" +
        "  sem_t sem;\n" +
        "} acl_zmq_context;\n" +
        "\n" +
        "#define p(X) (context->arg_##X)\n" +
        "\n" +
        "void* zmq_thread(void* context_pointer) {\n" +
        "  acl_zmq_context* context = (acl_zmq_context*)context_pointer;\n" +
        "  char ok = 'K', err = 'X';\n" +
        "  int res;\n" +
        "\n" +
        "  while (1) {\n" +
        "    while ((res = sem_wait(&context->sem)) == EINTR);\n" +
        "    if (res) {write(context->signal_fd, &err, 1); goto cleanup;}\n" +
        "    switch(p(command)) {\n" +
        "    case 0: goto cleanup;\n" +
        "    case 1: p(socket) = zmq_socket(context->context, p(int)); break;\n" +
        "    case 2: p(int) = zmq_close(p(socket)); break;\n" +
        "    case 3: p(int) = zmq_bind(p(socket), p(string)); break;\n" +
        "    case 4: p(int) = zmq_connect(p(socket), p(string)); break;\n" +
        "    case 5: p(int) = zmq_getsockopt(p(socket), p(int), (void*)p(string), &p(len)); break;\n" +
        "    case 6: p(int) = zmq_setsockopt(p(socket), p(int), (void*)p(string), p(len)); break;\n" +
        "    case 7: p(int) = zmq_send(p(socket), p(msg), p(int)); break;\n" +
        "    case 8: p(int) = zmq_recv(p(socket), p(msg), p(int)); break;\n" +
        "    case 9: p(int) = zmq_poll(p(socket), p(int), p(len)); break;\n" +
        "    }\n" +
        "    p(command) = errno;\n" +
        "    write(context->signal_fd, &ok, 1);\n" +
        "  }\n" +
        " cleanup:\n" +
        "  close(context->signal_fd);\n" +
        "  free(context_pointer);\n" +
        "  return 0;\n" +
        "}\n" +
        "\n" +
        "void* zmq_thread_init(void* zmq_context, int signal_fd) {\n" +
        "  acl_zmq_context* context = malloc(sizeof(acl_zmq_context));\n" +
        "  pthread_t thread;\n" +
        "\n" +
        "  context->context = zmq_context;\n" +
        "  context->signal_fd = signal_fd;\n" +
        "  sem_init(&context->sem, 1, 0);\n" +
        "  pthread_create(&thread, 0, &zmq_thread, context);\n" +
        "  pthread_detach(thread);\n" +
        "  return context;\n" +
        "}\n",
    },
    {
        key:"0-0-1",
        title: "2.c",
        code: "2.c"
    },
    {
        key:"0-0-2",
        title: "3.c",
        code: "3.c"
    },
    {
        key:"0-0-3",
        title: "4.c",
        code: "4.c"
    },
    {
        key:"0-0-4",
        title: "5.c",
        code: "5.c",
    }
];

export default treenode;